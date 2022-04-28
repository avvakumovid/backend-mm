import mongoose from "mongoose";

const Money = mongoose.Schema({
        name: {type: String, unique: true, required: true},
        totalMoney: {type: Number, unique: true, required: true, default: 0},
        transactions: [{type: mongoose.Schema.Types.ObjectId, ref: 'money'}]
})

export default mongoose.model('money', Money)