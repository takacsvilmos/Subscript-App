import express from 'express';
import cors from 'cors';
import getSchoolFromDB from "./javascript/Services/getSchoolFromDB.js";
import insertTeacher from "./javascript/Services/insertTeacher.js";
import insertApplication from "./javascript/Services/insertApplication.js";
import insertStudent from "./javascript/Services/insertStudent.js";

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
    let {teacher, application, studentsArray} = req.body;

    try {
        if (teacher && typeof teacher.previousApplication === 'string' && application) {
            teacher.previousApplication = teacher.previousApplication === 'yes' ? 1 : 0;
        }

        application.teacherId = await insertTeacher(teacher);
        console.log(req.body);
        const applicationId = await insertApplication(application);
        for(const student of studentsArray){
            await insertStudent(applicationId, student);
        }
        res.json({message: "New subscription created."});
    }catch (e){
        console.log(e);
        res.send("server error");
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
