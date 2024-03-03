import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth';
import todoRoutes from './routes/todo';
const port = 3000;


app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/todo', todoRoutes);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

mongoose.connect('mongodb+srv://soumya:soumya@cluster0.m7m8wqs.mongodb.net/', {
	dbName: 'courses'
});
