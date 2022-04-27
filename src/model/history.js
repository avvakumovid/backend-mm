import mongoose from "mongoose";

const History = mongoose.Schema({
        categories: {type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
        date: {type: Date,  default: Date.now()},
        summa: {type: Number}
})

export default mongoose.model('history', History)