const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./routes/route')
const startServer = require('./grpc').startServer;

app.use(cors());
app.use(express.json());

app.use("/api/", route);
app.get('/',(req,res)=>{
    res.send('Hello from server!!!')
})

startServer();

app.listen(3000, () => {
    console.log('Express Server running at http://localhost:3000');
})