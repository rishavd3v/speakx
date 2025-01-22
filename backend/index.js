const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const mongoose = require('mongoose');
const Question = require('./models/questionSchema');
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


// Implement the search service
// async function searchQuestions(call, callback) {
//     try {
//       const { query, type, page = 1, per_page = 10 } = call.request;
      
//       const searchQuery = {};
//       if (query) {
//         searchQuery.$text = { $search: query };
//       }
//       if (type) {
//             searchQuery.type = type;
//       }

//       const skip = (page - 1) * per_page;
//       const [questions, totalCount] = await Promise.all([
//         Question.find(searchQuery)
//             .skip(skip)
//             .limit(per_page),
//         Question.countDocuments(searchQuery)
//       ]);

//       // Map exactly as per the MongoDB structure
//       const formattedQuestions = questions.map(q => ({
//           id: q._id.toString(),
//           type: q.type,
//           anagram_type: q.anagramType,
//           blocks: q.blocks.map(block => ({
//               text: block.text,
//               show_in_option: block.showInOption,
//               is_answer: block.isAnswer
//           })),
//           options: q.options.map(option => ({
//               text: option.text,
//               is_correct_answer: option.isCorrectAnswer
//           })),
//           sibling_id: q.siblingId,
//           solution: q.solution,
//           title: q.title
//       }));

//       callback(null, {
//           questions: formattedQuestions,
//           total_count: totalCount
//       });
//   } catch (error) {
//       console.error('Search error:', error);
//       callback(error);
//   }
// }

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
            console.log(`Server running at http://0.0.0.0:${port}`);
        }
    );
}

startServer();