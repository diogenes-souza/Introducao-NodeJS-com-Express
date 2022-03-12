const req = require("express/lib/request");
const fs = require("fs");
const { join } = require('path')

const fliePath = join(__dirname, 'users.json')

const getUsers = () =>{
    const data = fs.existsSync(fliePath)
        ? fs.readFileSync(fliePath)
        : []
    try {
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

const saveUser = (users) => fs.writeFileSync(fliePath, JSON.stringify(users, null, '\t'))

const userRoute = (app) => {
    app.route('/users/:id?')

        .get((req, res) => {
            const users = getUsers()

            res.send({ users })
        })

        .post((req, res) => {
            const users = getUsers()

            users.push(req.body)
            saveUser(users)

            res.status(201).send('Ok')
        })

        .put((req, res) => {
            const users = getUsers()

            saveUser(users.map(user => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))

            res.status(200).send('Ok')
        })

        .delete((req, res) => {
            const users = getUsers()

            saveUser(users.filter(user => user.id !== req.params.id))

            res.status(200).send('Ok')
        })
}


module.exports = userRoute