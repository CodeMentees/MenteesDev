import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    siteName: {type:String,default:"Codementees"},
    carasouls :[{type:String,default:["https://media.istockphoto.com/id/1356364287/photo/close-up-focus-on-persons-hands-typing-on-the-desktop-computer-backlit-keyboard-screens-show.jpg"]}],
    contactNumber : {type:String,default:"9876543210"},
    features : [{type:String}]
});

const Home = mongoose.model("Home", homeSchema);

export default Home;