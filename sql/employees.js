const db = require('./db.js')
 
const employeesSchema = new db.mongoose.Schema ({
    "name":{type:String},
    "sex":{type:String},
    "salary":{type:Number},
    "years":{type:Number},
    "age":{type:Number}
})

 
module.exports = db.mongoose.model("employeesInfo",employeesSchema)
