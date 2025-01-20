const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['ANAGRAM',"MCQ", "READ_ALONG", "CONTENT_ONLY", "CONVERSATION"],
        required: true,
    },
    title:{
        type: String,
        required: true
    },
    anagramType: String,
    blocks:[{
        text: String,
        showInOption: Boolean,
        isAnswer: Boolean
    }],
    options:[{
        text: String,
        isCorrectAnswer: Boolean
    }],
    solution: String,
    siblingId: mongoose.Schema.Types.ObjectId
});
questionSchema.index({title:'text'});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;