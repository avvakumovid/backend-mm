import express from 'express'
import cors from 'cors' 
import 'dotenv/config'
import mongoose from 'mongoose'
import authRouter from './src/routes/authRouter.js'

const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', authRouter)


const PORT = process.env.PORT || 4000
const start = async () => {
    try {
        await mongoose.connect(process.env.CONNECTING_STRING)
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}...`))
    } catch (e) {
        console.log(e)
    }
}
start()