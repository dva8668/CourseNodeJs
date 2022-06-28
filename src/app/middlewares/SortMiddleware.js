module.exports = function SortMiddleware(req, res, next) {
    res.locals._sort = {
        anabled: false,
        type: 'default'
    };

    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals._sort, {
            anabled: true,
            type: req.query.type,
            column: req.query.column
        })
    }

    next()
}