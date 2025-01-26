const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const searchQuestions = require('./service/questionService');

// Proto path
const PROTO_PATH = path.resolve(__dirname, './proto/question.proto');

// Load proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const questionSearch = protoDescriptor.questionSearch;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/questsearch')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Start server
function startServer() {
    const server = new grpc.Server();
    server.addService(questionSearch.QuestionService.service, {
        searchQuestions: searchQuestions
    });
    
    server.bindAsync(
        '0.0.0.0:50051',
        grpc.ServerCredentials.createInsecure(),
        (error, port) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log(`GRPC Server running at http://0.0.0.0:${port}`);
        }
    );
}

const client = new questionSearch.QuestionService(
  'localhost:50051',
  grpc.credentials.createInsecure()
);

module.exports = {startServer, client};