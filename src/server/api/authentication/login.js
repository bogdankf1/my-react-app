const connection = require('./../../db/mongo.js')

const dbName = "myApp"

const loginHandler = async ctx => {
    const client = await connection.getConnection()
    const userData = ctx.request.body
    const foundUser = await getUserFromDB(client, userData)
    let getAccess = false
    if(foundUser.length !== 0 && foundUser[0].password === userData.password) {
        getAccess = true
    }
    ctx.body = JSON.stringify({access:getAccess})
}

const getUserFromDB = async (client, user) => {
    const db = client.db(dbName),
          collection = db.collection('users')
    const foundUser = await collection.find({username:user.username}).toArray()
    return foundUser
}

module.exports.loginHandler = loginHandler