const adminOpStudentModel = require("../models/adminOpStudentModel");
const Joi = require('joi');

const searchStudent = (req, res) => {

    partOfStudentName = req.params['partOfStudentName'];

    adminOpStudentModel.searchStudent(partOfStudentName)
        .then(users => {
            if (users.length == 0) {
                return res.status(201).json({ search: 'no user', users: [] });
            }
            else {
                return res.status(200).json({ search: 'search done with valid users', users: users });
            }
        });
}

const storeCourseDegree = (req, res) => {
    ///
    const schema = Joi.object({
        studentId: Joi
            .string()
            .required(),
        courseId: Joi
            .string()
            .required(),
        courseName: Joi
            .string()
            .required(),
        degree: Joi
            .number()
            .required(),
        courseDate: Joi
            .date()
            .required(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        const formattedErrors = error.details.map((detail) => ({
            field: detail.context.label,
            message: detail.message,
        }));
        return res.status(400).json({ errors: formattedErrors });
    }

    adminOpStudentModel.storeCourseDegree(req.body)
        .then(error => {
            //
        });
    return res.status(200).json({ storeNewCourseToStudent: 'done' });
}

const showCourses = (req, res) => {
    const studentId = req.params['studentId'];
    adminOpStudentModel.showCourses(studentId)
        .then(oneStudent => {
            if (!oneStudent[0].hasOwnProperty('studentCourses')) {
                return res.status(201).json({ search: 'no courses for this student' });
            }
            else {
                if (oneStudent[0].studentCourses.length == 0) {
                    return res.status(201).json({ search: 'no courses for this student' });
                }
                else {
                    return res.status(200).json({ search: 'student courses valid', courses: oneStudent[0].studentCourses });
                }

            }
        });
}

module.exports = {
    searchStudent,
    storeCourseDegree,
    showCourses
}