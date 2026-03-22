const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { addNote, getNotes, printNotes, removeNote } = require('./notes.controller').default
const mongoose = require('mongoose')

mongoose.connect(
    'mongodb+srv://dianalyutaya12_db_user:qqqqqqqq@cluster0.tckqa1m.mongodb.net/notes?appName=Cluster0'
).then(() => {
    
})























// yargs(hideBin(process.argv))
//     .command({
//         command: 'add',
//         describe: 'Add new note to list',
//         builder: {
//             title: {
//                 type: 'string',
//                 describe: 'Title',
//                 demandOption: true
//             }
//         },
//         handler({ title }) {
//             addNote(title)
//         }
//     })
//     .command({
//         command: 'list',
//         describe: 'print all notes',
//         async handler() {
//          printNotes()
//         }
//     })
//     .command({
//         command: 'remove',
//         describe: 'Remove note by id',
//         builder: {
//             id: {
//                 type: 'string',
//                 describe: 'id',
//                 demandOption: true
//             }
//         },
//         handler({ id }) {
//             removeNote(id)
//         }
//     })

// .parse()