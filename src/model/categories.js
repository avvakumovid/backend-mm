import mongoose from "mongoose";

const Categories = mongoose.Schema({
        name: {type: String, unique: true, required: true},
})

export default mongoose.model('categories', Categories)