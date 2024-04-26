import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    Names:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
}
)

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;