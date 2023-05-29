import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";


//*** Import Routes ***/
import authRoutes from "./routes/auth.js";
import navLinksRoutes from "./routes/navlinks.js";
import navSubLinksRoutes from "./routes/navsublinks.js";
import productsRoutes from "./routes/products.js";
import categoryRoutes from "./routes/category.js";


const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/navlinks", navLinksRoutes);
app.use("/api/navsublinks", navSubLinksRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/category", categoryRoutes);



app.listen(8081, () => {
    console.log("Connected API กำลังรันที่พอร์ท 8081..");
});