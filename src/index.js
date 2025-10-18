import dotenv from 'dotenv'
import ConnectionDB from "./db/index.js";
import { app } from './app.js';


dotenv.config({path: './.env'})

ConnectionDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running on port:  ${process.env.PORT || 8000}`);
    })
})
.catch((error)=>{
    console.log("DataBase Connection Failed", error);
    
})