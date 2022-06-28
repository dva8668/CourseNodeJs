const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')

// GET '/stored.courses'
class MeController {

    // GET '/stored/courses
    storedCourses(req, res, next) {
        // sort 
        let courseQuery = Course.find({})
        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type
            })
        }



        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: mutipleMongooseToObject(courses)
        //     }))
        //     .catch(next);

        // // Count delete course
        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount)
        //     })
        //     .catch(() => {

        //     });

        // Gop lai dung Promise all
        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then((value) => {
                res.render('me/stored-courses', {
                    courses: mutipleMongooseToObject(value[0]),
                    deletedCount: value[1],

                })
            }).catch((next));

    }



    // GET '/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next);
    }
}

module.exports = new MeController;