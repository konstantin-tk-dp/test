import path from 'path';

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import pkg from 'dotenv';

import messageRouter from './routes/index.js';

pkg.config();

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Expose-Headers', 'Content-Range');

    next();
});

app.use('/api', messageRouter);

mongoose.connect(process.env.MONGODB_URL)
    .then(result => {
        app.listen(process.env.PORT || 8082);
        console.log("success")
    })
    .catch(err => console.log(err));