import express from 'express';
import path from 'path';

const app = express();

app.use((req,res,next)=>{
    console.log("this is middleware");
    next();
});

app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: '.' });
});

app.get('/vikesh',(req,res)=>{
    res.send("vikesh is your father");
});

app.listen(3000, () => {
    console.log("server is running on port 3000");
});
