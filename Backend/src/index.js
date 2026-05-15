// import dotenv from 'dotenv';
// import connectDB from "./config/database.js";
// import app from "./app.js";
// import listEndpoints from "express-list-endpoints";

// dotenv.config({
//   path: './.env'
// });

// const startServer = async () => {
//     try {
//         await connectDB();

//         setTimeout(() => {
//             console.log("=================== Endpoints ==================");
//             console.log(listEndpoints(app));
//         }, 1000);

//         app.on("error", (error) => {
//             console.log("ERROR", error);
//             throw error;

//         });
//         app.listen(process.env.PORT || 5000 , () => {
//             console.log(`Server is running on port ${process.env.PORT || 5000}`);
//         });

//     } catch (error) {
//         console.log("ERROR", error);

// }}
// startServer();
