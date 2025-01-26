const express = require('express');
const router = express.Router();
const client = require('../grpc').client;

function getQuestion(query,type,page){

    return new Promise((resolve, reject) => {
        const request = {
            query: query,
            type: type,
            page: page,
            per_page: 10
        };

        console.log('Sending request:', request);

        client.searchQuestions(request, (error, response) => {
            if (error) {
                console.error('Error:', error);
            return reject(error); // Reject promise
            }
            resolve(response); // Resolve promise
        });
    });
}

router.get('/questions', async (req, res) => {

    const query = req.query.query;
    const type = req.query.type;
    const page = req.query.page;

    const data = await getQuestion(query,type,page);

    res.json(data);
})

module.exports = router;