import chalk from 'chalk'
import Note from './models/Note.js'


const addNote = async (title) =>  {
    await Note.create({ title })
    console.log(chalk.green.inverse('Note wass Added'))
}

const getNotes = async () => {
    const notes = await Note.find();
    console.log(notes)
    return notes;
}

const printNotes = async () =>  {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    })
}

const removeNote = async (id) => {
    await Note.deleteOne({_id: id})
    console.log(chalk.red.inverse('Note not found'))
    
}

const replaceNote = async (noteData) => {
    await Note.updateOne({_id: noteData.id}, {title: noteData.title})
}

export {
    addNote, getNotes, printNotes, removeNote, replaceNote
}