import express from 'express';
import cors from 'cors';
import getSchoolFromDB from "./javascript/Services/getSchoolFromDB.js";
import insertTeacher from "./javascript/Services/insertTeacher.js";

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

app.post('/subscription', async(req, res) => {
    let {teacher, schoolCode, studentsArray} = req.body;
    if(teacher && schoolCode && studentsArray){
        if (teacher && typeof teacher.previousApplication === 'string') {
            teacher.previousApplication = teacher.previousApplication === 'yes' ? 1 : 0;
        }
        await insertTeacher(teacher);
        res.send("new subscription");
    }else{
        console.log("no request body");
        res.send("no request body");
    }

});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
