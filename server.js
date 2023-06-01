import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";




//*** Import Routes ***/
import authRoutes from "./routes/auth.js";
import navLinksRoutes from "./routes/navlinks.js";
import navSubLinksRoutes from "./routes/navsublinks.js";
import productsRoutes from "./routes/products.js";
import categoryRoutes from "./routes/category.js";


const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());
app.use(cors({
    //origin: ["http://localhost:5173"],
    origin: ["https://api-goodex.onrender.com"],
    methods: ["POST","GET"],
    credentials: true
}));
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/navlinks", navLinksRoutes);
app.use("/api/navsublinks", navSubLinksRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/category", categoryRoutes);




app.listen(8081, () => {
    console.log("Connected API กำลังรันที่พอร์ท 8081..");
});