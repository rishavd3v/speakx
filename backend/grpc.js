const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const searchQuestions = require('./service/questionService');

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

// Proto path
const PROTO_PATH = path.resolve(__dirname, './proto/question.proto');

// Load proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const questionSearch = protoDescriptor.questionSearch;

// Connect to Mongo
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


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