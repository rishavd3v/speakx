const Question = require("../models/questionSchema");

  async function searchQuestions(call, callback) {
    try {
      const { query, type, page = 1, per_page = 10 } = call.request;

      const searchQuery = {};
      if (query) {
        searchQuery.$text = { $search: query };
      }
      if (type) {
        searchQuery.type = type;
      }

      const skip = (page - 1) * per_page;
      const [questions, totalCount] = await Promise.all([
        Question.find(searchQuery).skip(skip).limit(per_page),
        Question.countDocuments(searchQuery),
      ]);

      // Map exactly as per the MongoDB structure
      const formattedQuestions = questions.map((q) => ({
        id: q._id.toString(),
        type: q.type,
        anagram_type: q.anagramType,
        blocks: q.blocks.map((block) => ({
          text: block.text,
          show_in_option: block.showInOption,
          is_answer: block.isAnswer,
        })),
        options: q.options.map((option) => ({
          text: option.text,
          is_correct_answer: option.isCorrectAnswer,
        })),
        sibling_id: q.siblingId,
        solution: q.solution,
        title: q.title,
      }));

      callback(null, {
        questions: formattedQuestions,
        total_count: totalCount,
      });
    } catch (error) {
      console.error("Search error:", error);
      callback(error);
    }
  }

module.exports = searchQuestions;