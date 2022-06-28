module.exports = {
    mutipleMongooseToObject: function(mongooseArray) {
        return mongooseArray.map(mongoose => mongoose.toObject())
    },
    mongooseToObject: function(mongooseArray) {
        return mongooseArray ? mongooseArray.toObject() : mongooseArray
    }
}