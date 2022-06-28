const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseController');
// THem
router.get('/create', courseController.create)
    // Store
router.post('/store', courseController.store)
    // handle form action
router.post('/handle-form-action', courseController.handleFormAction)
    // Edit
router.get('/:slug/edit', courseController.edit)
    // Put 
router.put('/:slug/', courseController.update)
    // delete
router.delete('/:slug/', courseController.delete)
router.delete('/:slug/force', courseController.remove)

// restore
router.patch('/:slug/restore', courseController.restore)




router.get('/:slug', courseController.show)

module.exports = router;