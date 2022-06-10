const express = require('express') //exporting module express
const res = require('express/lib/response')
const app = express() // creating an instance of express
const student = require('./demo')

app.use(express.json())

app.set('view engine', 'ejs') // embeded javascript template

//GET METHOD
app.get('/', (req, res) => {
    res.json({ message: "API is working" })
})

app.get('/api/students', (req, res) => {
    res.json(student)
})

//POST METHOD

app.post('/api/students', (req, res) => {
    //console.log((req.body));
    const user = {
        id: student.length + 1,
        name: req.body.name,
        phone_no: req.body.phone_no,
        status: req.body.status
    }

    student.push(user)
    res.json(user)
})

//PUT METHOD
app.put('/api/students/:id', (req, res) => {
        let id = req.params.id
        let name = req.body.name
        let phone_no = req.body.phone_no
        let status = req.body.status

        let index = student.findIndex((student) => {
            return (student.id == Number.parseInt(id))
        })
        if (index <= 0) {
            let std = student[index]
            std.name = name
            std.phone_no = phone_no
            std.status = status
            res.json(std)
        } else {
            res.status(404)
        }
    })
    // DELETE
app.delete('/api/students/:id', (req, res) => {
    let id = req.params.id
    let index = student.findIndex((student) => {
        return (student.id == Number.parseInt(id))
    })
    console.log(index);
    if (index != -1) {
        let std = student[index]
        student.splice(index, 1)
        res.json(std)
    }


})



app.listen(3000) //port passing
























// app.get('/about', (req, res) => {
//     res.sendFile(__dirname + '/about.html')
// })

// // get method using route params

// app.get('/username/:user_id', (req, res) => { 
//     res.send('This is a profile page for user : ' + req.params.user_id)
// })

// app.get('/profile/:id', (req, res) => {
//     let user = {
//             username: 'john',
//             age: 30,
//             address: 'NJ'
//         }
//     res.render('userprofile', { 'user_id': req.params.id, 'user': user }) 

// })

// app.put('/put', (req, res) => {
//     res.send('put request called')
// })
// app.post('/create_user', (req, res) => {
//     res.send('user is created')
// })