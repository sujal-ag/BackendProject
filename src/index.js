// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './env'
})


connectDB()
.then( () => {

    app.on(error, (error) => {
        console.log("Express is unable to talk to our db");
        throw error;
    })

    const port = process.env.PORT || 8000;
    app.listen(port, () => {
        console.log(`App is listenig on port ${port}`);
    })
}
)
.catch(erorr => console.log("MONGO DB connection failed, ",error))













// import express from "express"
// const app = express()

// ;( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("Express is unable to talk to our db");
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App listening on port ${process.env.PORT}`);
//         })

//     } catch (error) {
//         console.error("Error: ",error)
//         throw error;
//     }
// })()