import Note from "../models/Note.js"


export async function getAllNotes(req,res) {
    try {
        const notes = await Note.find().sort({createdAt:-1})

        res.status(200).json(notes)
    } catch (error) {
        console.log("Error from get method!")
        res.status(500).json({message:"Server Error"})
    }
}

export async function getSingleNote(req,res) {

    try {
        const note =await Note.findById(req.params.id);
        if(!note){
            res.status(404).json({message:"Note not found"})
        }
        res.status(200).json(note)
    } catch (error) {
        console.log("Error from get by id method!")
        res.status(500).json({message:"Server Error"})
    }

}

export async function postNote(req,res){

    try {
        const {title,content} = req.body;
        const newNote = new Note({title,content})

        await newNote.save()
        res.status(201).json({message:"Note Created Successfully"})

    } catch (error) {
        console.log("Error from Post method!")
        res.status(500).json({message:"Server Error"})
    }
}

export async function updateNote(req,res){
    try {
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content})
        if(!updateNote){
            return res.status(404).json({message:"Note not found"})
        }
        res.status(200).json({message:"Note updated Success"})
        
    } catch (error) {
        console.log("Error from Put method!")
        res.status(500).json({message:"Server Error"})
    }
}

export async function deleteNote(req,res){

    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote){
            res.status(404).json({message:"Note not Found"})
        }
        res.status(200).json({message:"Note Deleted Successfully"})
    } catch (error) {
        console.log("Error from Delete method!")
        res.status(500).json({message:"Server Error"})
    }
}