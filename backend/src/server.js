import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

// Middleware: Acceso a JSON bodies (req.body)
app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:5173",
    })
);

app.use("/api/notes", notesRoutes);

// Puerto y conexion a la Base de Datos (MongoDB)
connectDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server started on PORT ${PORT}`);
    });

});




