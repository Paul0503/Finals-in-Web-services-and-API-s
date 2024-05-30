const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let students = [];


app.post('/addstudent', (req, res) => {
    const student = req.body;
    students.push(student);
    res.status(201).send(student);
});


app.put('/editstudent/:id', (req, res) => {
    const { id } = req.params;
    const updatedStudent = req.body;
    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        students[index] = updatedStudent;
        res.send({ message: 'Edit Successfully' });
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
});



app.delete('/deletestudent/:id', (req, res) => {
    const { id } = req.params;
    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        const deletedStudent = students.splice(index, 1);
        res.send({ message: 'Deleted Successfully' });
    } else {
        res.status(404).send({ message: 'Student not found' });
    }
});



app.get('/list', (req, res) => {
    res.send(students);
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
