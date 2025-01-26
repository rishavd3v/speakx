const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Question = require('../models/questionSchema');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
async function importData() {
    try {
        await mongoose.connect(MONGO_URL);

        await Question.collection.createIndex({ title: 'text' });

        const filePath = path.join(__dirname, 'data.json');
        const fileData = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(fileData);

        const format = data.map((item) => ({
            ...item,
            _id: item._id.$oid,
            siblingId: item.siblingId ? item.siblingId.$oid : undefined,
        }));

        await Question.insertMany(format);
        
    }
    catch (error) {
        console.error('Error:', error);
    }
}

importData();