import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: String, required: true },
    link : {type : String, required : true},
    image : {type :String ,required :true},
    startDate: { type: Date },
    endDate: { type: Date }

});
const Event = mongoose.model('Event', eventSchema);
export default Event;