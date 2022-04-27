import mongoose from "mongoose";

const User = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    totalMoney: {type: Number, default: 0},
    income: [{type: mongoose.Schema.Types.ObjectId, ref: 'money'}],
    expenses: [{type: mongoose.Schema.Types.ObjectId, ref: 'money'}],
})

export default mongoose.model('user', User)