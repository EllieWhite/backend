const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const { addNote, getNotes, printNotes, removeNote } = require('./notes.controller').default

yargs(hideBin(process.argv))
    .command({
        command: 'add',
        describe: 'Add new note to list',
        builder: {
            title: {
                type: 'string',
                describe: 'Title',
                demandOption: true
            }
        },
        handler({ title }) {
            addNote(title)
        }
    })
    .command({
        command: 'list',
        describe: 'print all notes',
        async handler() {
         printNotes()
        }
    })
    .command({
        command: 'remove',
        describe: 'Remove note by id',
        builder: {
            id: {
                type: 'string',
                describe: 'id',
                demandOption: true
            }
        },
        handler({ id }) {
            removeNote(id)
        }
    })

.parse()