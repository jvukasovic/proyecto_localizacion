import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import * as boulderRoutes from './routes/boulder.routes.js';


mongoose.connect('mongodb://localhost:27017/BoulderLocalization') 
.then(() => console.log('Conexión correcta'))
.catch((e) => console.log('Error: ', e))

const app = express();

app.use(cors());
app.use(express.json());

app.use(boulderRoutes.router);

app.listen(8000);