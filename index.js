import chalk from 'chalk'
import { dirname } from 'path';
import { fileURLToPath } from 'url'
import express from 'express';
import path from "node:path";

import { addNote, getNotes, removeNote } from './notes.controller.js';

const app = express() 

const port = 3000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.set('view engine', 'ejs')
app.set('views', 'pages')

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

app.get('/', async (req, res) => {
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
})

app.post('/', async (req, res) => {
    addNote(req.body.title)
    res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: true
    })

})

app.delete('/:id', async (req, res) => {
    await removeNote(req.params.id)
      res.render('index', {
        title: 'Express App',
        notes: await getNotes(),
        created: false
    })
}) 

app.listen(port, () => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})