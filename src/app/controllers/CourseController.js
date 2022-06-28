const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')


class CourseController {

    // GET /course/:slug
    show(req, res, next) {
            Course.findOne({ slug: req.params.slug })
                .then((course) => {
                    res.render('courses/show', { course: mongooseToObject(course) })
                })
                .catch(next)


        }
        // GET /courses/create
    create(req, res, next) {
            res.render('courses/create')
        }
        // POST /courses/store

    store(req, res, next) {
            const formData = {...req.body }
            formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
            const course = new Course(formData)
            course.save()
                .then(() => {
                    res.redirect('/me/stored/courses')
                }).catch((err) => {

                });
        }
        // GET courses/slug/edit
    edit(req, res, next) {
            Course.findOne({ slug: req.params.slug })
                .then((course) => res.render('courses/edit', {
                    course: mongooseToObject(course)
                }))
                .catch(next)
        }
        // PUT courses/:slug
    update(req, res, next) {
        const formData = req.body
        Course.updateOne({ slug: req.params.slug }, formData)
            .then(() => res.redirect('/me/stored/courses')) //redirect: dieu huong den 1 path moi
            .catch(next)

    }

    // PATCH courses/:id/restore
    restore(req, res, next) {
            Course.restore({ slug: req.params.slug })
                .then(() => res.redirect('back'))
                .catch(next)

        }
        // DELETE courses/:slug 
    delete(req, res, next) {
        Course.delete({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // DELETE courses/:slug/force
    remove(req, res, next) {
        Course.deleteOne({ slug: req.params.slug })
            .then(() => res.redirect('back'))
            .catch(next)
    }


    // POST handleFormAction /courses/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ slug: { $in: req.body.courseSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'restore':
                Course.restore({ slug: { $in: req.body.courseSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            case 'remove':
                Course.remove({ slug: { $in: req.body.courseSlugs } })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action not invalid' })
        }
    }




}



module.exports = new CourseController;