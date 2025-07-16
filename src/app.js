import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import adMasterRoutes from './routes/adMasterRoutes.js';
import ghadiRoutes from './routes/ghadiRoutes.js';
import userMapRoutes from './routes/userMapRoutes.js';
import resultRoutes from './routes/resultRoutes.js';
import adRoutes from './routes/adRoutes.js';
import contentBlockRoutes from './routes/contentBlockRoutes.js';
import pageViewRoutes from './routes/pageViewRoutes.js';
import { errorHandler } from './utils/errorHandler.js';
import agentGhadiRoutes from './routes/agentGhadiRoutes.js';
import cors from 'cors';
// DB connections.
import connectDB from './config/dbConnect.js';

dotenv.config();
const app = express();
dotenv.config();
connectDB();
app.use(cors({
  origin: ["http://localhost:3003", "http://localhost:3000","http://localhost:3001","http://localhost:3002"],
  credentials: true,
}));


app.use(express.json());



app.use('/api/users', userRoutes);
app.use('/api/admasters', adMasterRoutes);
app.use('/api/ghadis', ghadiRoutes);
app.use('/api/usermaps', userMapRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/contentblocks', contentBlockRoutes);
app.use('/api/pageviews', pageViewRoutes);
app.use('/api/agent', agentGhadiRoutes);

//testing on server side

app.get('/', (req, res) => {
    res.send('API is working ✅');
  });

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
