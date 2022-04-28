import mongoose from "mongoose";

const Transaction = mongoose.Schema({
        categories: {type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
        date: {type: Date,  default: Date.now()},
        summa: {type: Number}
})

export default mongoose.model('transaction', Transaction)