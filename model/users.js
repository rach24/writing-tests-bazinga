var mongoose=require('mongoose');
var schema=mongoose.Schema;

var user= schema({ 
    first_name : {type:String,max:60,required:true},
    last_name : {type:String,max:60,required:true},
    email : {type:String, required:true,index:{unique:true}},
    password : {type:String , required:true},
    dob : {type:String,required:true},
    gen : {type:String,required:true,enum:['M','F']},
    address: {type:String,max:100},
    university: {type:String,},
    status: {type:String},
    phone_no: {type:String},
    date_activated: {type:String}
});

var User=mongoose.model('User',user);
module.exports = User;

