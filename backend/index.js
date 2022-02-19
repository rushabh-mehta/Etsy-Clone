import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.listen(3000, ()=>{
    console.log('Example app listening on port 3000');
})

app.get('/', (req, res) => {
    res.send('Hello World!');
});