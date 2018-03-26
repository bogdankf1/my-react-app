const connection = require('./../../db/mongo.js')

const dbName = "myApp"

const signUpHandler = async ctx => {
    const client = await connection.getConnection()
    const userData = ctx.request.body
    const insertingComplete = await insertUserInDB(client, userData)
    ctx.body = JSON.stringify({status:true})
}

const insertUserInDB = async (client, user) => {
    const db = client.db(dbName),
          collection = db.collection('users')
    const completed = await collection.insert(user)
    return completed
}

module.exports.signUpHandler = signUpHandler