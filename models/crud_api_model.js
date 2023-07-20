const mongoose = require('mongoose')

const schemae = mongoose.Schema

const apiSchema = schemae({
    name:{type:String,requred:true},
    email:{type:String,requred:true},
    age:{type:Number,requred:true},
    isDeleted:{type:Boolean,default:false, enum:[true,false]},
    status:{type:String,default:"Active", enum:["Active","Inactive"]}
   


},{
    timestamps:true,
    versionKey:false
})

module.exports = mongoose.model('apiSchema',apiSchema)