const connection = require('./../../db/mongo.js')

const dbName = "myApp"

const signUpHandler = async ctx => {
    const client = await connection.getConnection()
    const userData = ctx.request.body
    const consist = await checkUserForConsistInDB(client, userData)
    if(consist.length === 0) {
        const insertingComplete = await insertUserInDB(client, userData)
        ctx.body = JSON.stringify({signUpStatus:true})
    } else {
        console.log(consist)
        ctx.body = JSON.stringify({signUpStatus:false})
    }
}

const insertUserInDB = async (client, user) => {
    const db = client.db(dbName),
          collection = db.collection('users')
    const completed = await collection.insert(user)
    return completed
}

const checkUserForConsistInDB = async (client, user) => {
    const db = client.db(dbName),
          collection = db.collection('users')
    const consisted = await collection.find({username:user.username}).toArray()
    return consisted
}

module.exports.signUpHandler = signUpHandler