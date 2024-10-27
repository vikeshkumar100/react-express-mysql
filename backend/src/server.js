import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import dotenv from 'dotenv';

const app=express();
app.use(cors());
app.use(express.json());
dotenv.config();

const port=process.env.port || 3000;
const db=mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database
})

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.get('/users',(req,res)=>{
    const q1="select * from users";
    db.query(q1,(err,result)=>{
        if(err){
            return res.status(500).json(err);
        }
        else
        return res.status(200).json(result);
    })
})
app.post('/signup',(req,res)=>{
    const {name,password}=req.body;
    const q1="insert into users(email,password) values(?,?)";
    db.query(q1,[email,password],(err,result)=>{
        if(err){
            return res.status(500).json({ error: 'Failed to insert user', details: err });
        }
        return res.status(201).json({ message: 'User added successfully', insertId: result.insertId });
    })
})

app.listen(port,()=>{
    console.log(`Server started on port ${port}`);
})
