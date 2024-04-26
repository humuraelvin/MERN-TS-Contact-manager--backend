import express from 'express';
const cors =require('cors');
require('dotenv').config();
import dbconnection from './utils/dbconn';
import router from './routes/routes';

const app = express();
app.use(express.json());
app.use(cors());


//dbconnection
dbconnection();


app.use('/',router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    
})