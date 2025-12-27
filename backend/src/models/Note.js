import mongoose from "mongoose";

// 1 - Crear Schema a traves de mongoose 
// 2 - Crear un modelo basado en el Schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // Creado a las... , modificado a las...
);

const Note = mongoose.model("Note", noteSchema);

export default Note;



