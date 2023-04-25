const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


//we want username to be unique because if someone already signup with that username, 
//then mongoose won allow the username in the database since it already exist
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, 
        unique: true //we want this to be unqiue 
    },
    password: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: 0
    }
})

//Here we are making our own static method on a model. 
//we can use this method to signup user and save them in the database
//we are trying to hash password before we save them to the database. 
//So we are using bCrypt to hash password. 
//Bcrypt is hashing function that can hash our password in a secure way.
//even if ppl able to get into the database, the password would still be procted.
userSchema.statics.signup = async function(username, password) {
    //Here is just validation for username and pw
    if(!username || !password){
        throw Error('All fields must be filled')
    }
    
    //checking to see if entered username already existed
    const exists = await this.findOne({username})
    if(exists){
        throw Error('Username already in use')
    }

    //salt is random string of character that get added to user password before it get hashed. Add extra security
    //if two people use same password, salt be different. prevent hacker from password matching
    //we do this by generating salt and hashing it with password. and store the hash in DB
    const salt = await bcrypt.genSalt(10) //the longer the number, the longer it take for hacker to crack pw, but also take longer for user to signup
    const hash = await bcrypt.hash(password, salt)

    //take hashing pw with user username and store it in DB
    const user = await this.create({username, password: hash })

    return user
}

//This is for the login method
userSchema.statics.login = async function(username, password){
    if(!username || !password){
        throw Error('All fields must be filled')
    }

    //checking to see if entered username already existed
    const user = await this.findOne({username})
    if(!user){
        throw Error('Incorrect username')
    }

    //comparing the pw to check if it the same
    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect password')
    }

    return user
}



module.exports = mongoose.model('User', userSchema)