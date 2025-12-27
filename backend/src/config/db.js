import mongoose from "mongoose";


export const connectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MONGODB CONECTADO CON EXITO");

    } catch (error) {
        console.error("Error conectandose a MONGODB", error);
        process.exit(1); // Salir con error
    }
};