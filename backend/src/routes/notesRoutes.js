import express from 'express'
import { deleteNote, getAllNotes,getSingleNote, postNote, updateNote } from '../controllers/notesController.js'

const router = express.Router()

//Get all notes
router.get("/",getAllNotes)

//Get single note
router.get("/:id",getSingleNote)

//Create a note
router.post('/',postNote)

//update a note
router.put('/:id',updateNote)

//update a note
router.delete('/:id',deleteNote)


export default router;