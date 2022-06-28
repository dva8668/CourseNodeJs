const newRouter = require('./news')
const siteRouter = require('./site')
const meRouter = require('./me')

const courseRouter = require('./courses')



function route(app) {

    app.use('/news', newRouter);
    app.use('/courses', courseRouter);
    app.use('/me', meRouter);


    app.use('/search', siteRouter);
    app.use('/', siteRouter);




    // app.get('/search', (req, res) => {
    //     res.render('search');
    // });
}

module.exports = route;