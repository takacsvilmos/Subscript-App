import express, {response} from 'express';
import cors from 'cors';
import getSchoolFromDB from "./javascript/Services/getSchoolFromDB.js";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/schools/:id', async (req, res) => {
    const schoolCode = req.params.id;
    console.log("schoolcode", schoolCode);
    try {
        res.send(await getSchoolFromDB(schoolCode));
    } catch (e) {
        res.send(e);
    }
});

app.post('/subscription', (req, res) => {
    const requestBody = req.body;
    if(requestBody){
        console.log(requestBody);
        res.send(requestBody);
    }else{
        console.log("no request body");
        res.send("no request body");
    }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
