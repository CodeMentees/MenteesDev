import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    siteName: String,
    carasouls :[{type:String}],
    contactNumber : String,
    features : [{}]
});

const Home = mongoose.model("Home", homeSchema);

export default Home;