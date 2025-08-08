import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import snippetRoutes from './routes/snippetRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config(); 

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err));

app.use('/api/snippets', snippetRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log('Server running on port 5000')
})
