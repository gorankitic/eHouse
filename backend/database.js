const mongoose = require('mongoose')
const chalk = require('chalk')

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true
        }).then(con => console.log(chalk.bgGreen('Connected to the database successfully.')))
    } catch(error) {
        console.log(chalk.bgRed(error))
    }
}

module.exports = connectDatabase