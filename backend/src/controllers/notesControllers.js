import Note from "../models/Note.js";

// GET all notes
export async function get_all_notes (req, res) {

    try {
        const notes = await Note.find().sort({ createdAt: -1 }); // Mostrar el mas reciente primero
        res.status(200).json(notes);
    
    } catch(error) {
        console.error("Error en el controlador: get_all_notes", error);
        res.status(500).json({ message: "Error del servidor" });
    }

};

// GET specifc note
export async function specific_note (req, res) {

    try {
        const specificNote = await Note.findById(req.params.id);

        // ID incorrecta 
        if (!specificNote) return res.status(404).json({ message: "Nota no encontrada" }); 

        res.status(200).json(specificNote);
    
    } catch(error) {
        console.error("Error en el controlador: specific_note", error);
        res.status(500).json({ message: "Error del servidor" });
    }

};


// POST
export async function create_note (req, res) {
    try {
        const {title, content} = req.body;
        const note = new Note ({ title, content });

        const savedNote = await note.save();
        res.status(201).json({savedNote});

    } catch (error) {
        console.error("Error en el controlador: create_note", error)
        res.status(500).json({ message: "Error del servidor" });
    }

};

// PUT
export async function update_note (req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, { title, content },
            {
                new: true,
            }
        );

        // ID incorrecta 
        if (!updatedNote) return res.status(404).json({ message: "Nota no encontrada" }); 

        res.status(200).json(updatedNote);

    } catch (error) {
        console.error("Error en el controlador: update_note", error)
        res.status(500).json({ message: "Error del servidor" });
    }
};

// DELETE
export async function delete_note (req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        // ID incorrecta 
        if (!deletedNote) return res.status(404).json({ message: "Nota no encontrada" }); 

        res.status(200).json({ message: "Nota eliminada con exito!" });

    } catch (error) {
        console.error("Error en el controlador: delete_note", error)
        res.status(500).json({ message: "Error del servidor" });
    }
};

