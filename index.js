import chalk from 'chalk'
import { dirname } from 'path';
import { fileURLToPath } from 'url'
import express from 'express';
import path from "node:path";
import mongoose from 'mongoose';

import { addNote, getNotes, removeNote, replaceNote } from './notes.controller.js';
import addUser from './users.controller.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
    extended: true
}))

//const basePath = join(__dirname, 'pages')
//const server = http.createServer(async(req, res) => {
//    if(req.method === "GET") {
//        const content = await fs.readFile(join(basePath, 'index.html'))
//        res.writeHead(200, {
//            'Content-Type': 'text/html'
//        })
//       res.writeHead(404)
//        res.end(content)
//    } else if (req.method === "POST") {
//
//        const body = []
//        res.writeHead(200, {
//            'Content-type': 'text/plain; charset=utf-8'
//        })
//
//        req.on('data', data => {
//            body.push(Buffer.from(data))
//        })
//
//        req.on('end', () => {
//            const title = body.toString().split('=')[1].replaceAll('+', ' ');
//            addNote(title)
//        }) 
//        res.end('Post success')
//    }
//})

app.get('/register', async (req, res) => {
    res.render('register', {
        title: 'Express App',
        error: undefined
    })
})
 
app.post('/register', async (req, res) => {
    try {
        await addUser(req.body.email, req.body.password);
        res.redirect('/login')
    } catch (e) {
        if (e.code === 11000) {
            res.render('register', {
            title: 'Express App',
            error: 'Email is already register'
        })
            return
        }
        res.render('register', {
            title: 'Express App',
            error: e.message
        })
    }
})
 
app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false,
        error: false
    })
})

app.post('/', async (req, res) => {
    try {
        addNote(req.body.title)
        res.render('index', {
            title: 'Express App',
            notes: await getNotes(),
            created: true,
            error: false
        })
    } catch(e) {
        console.error('creation error', e)
         res.render('index', {
            title: 'Express App',
            notes: await getNotes(),
            created: false,
            error: true
        })
    }
})

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
      res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false,
        error: false
    })
}) 

app.put('/:id', async (req, res) => {
    await replaceNote({id: req.params.id, title: req.body.title})
      res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
}) 

mongoose.connect(
    'mongodb+srv://dianalyutaya12_db_user:6zv&pQgS3GqV@cluster0.tckqa1m.mongodb.net/notes?appName=Cluster0'
).then(() => {

    app.listen(port, () => {
        console.log(chalk.green(`Server has been started on port ${port}`))
    })
})

//app.listen(port, () => {
//    console.log(chalk.green(`Server has been started on port ${port}`))
//})