import express from 'express';
const cors = require("cors");
import queryRoutes from './routes/queryRoute';

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.get('/', (req, res) =>{
    res.status(200).json({
        message: "Server is healthy"
    })
});

app.use('/api', queryRoutes);

app.listen(PORT, () =>{
    console.log("server running on port", 5000)
})



