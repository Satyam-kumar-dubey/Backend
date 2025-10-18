
import mongoose from 'mongoose'
import { DB_NAME } from '../constants.js'


const ConnectionDB = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB Connected Successfully");
        
    } catch (error) {
        console.log("MongoDB connection Failed: ",error);
        process.exit(1)
    }
}

export default ConnectionDB