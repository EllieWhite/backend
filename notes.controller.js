import fs from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url'
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const notesPath = join(__dirname, 'db.json')


const addNote = async (title) =>  {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green.inverse('Note wass Added'))
}

const getNotes = async () => {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

const printNotes = async () =>  {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.id, note.title))
    })
}

const removeNote = async (id) => {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === id)
    if(index !== -1) {
        notes.splice(index, 1)
        await fs.writeFile(notesPath, JSON.stringify(notes))
        console.log(chalk.green.inverse('Note was deleted'))
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}


const replaceNote = async (noteData) => {
    const notes = await getNotes()
    const index = notes.findIndex(note => note.id === noteData.id)
    if (index >= 0) {
        notes[index] = { ...notes[index], ...noteData }
        await saveNotes(notes)
        console.log(chalk.bgGreen(`Note with id="${noteData.id}" has been updated!`))
    }
}

export {
    addNote, getNotes, printNotes, removeNote, replaceNote
}