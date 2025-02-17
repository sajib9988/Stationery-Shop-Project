import mongoose from 'mongoose'
import app from './app'
import config from './app/config'


async function server() {
  try {
    console.log('Connecting to database...', config.database_url)
    await mongoose.connect(config.database_url as string)
console.log('Database connected!', config.database_url)
console.log('Starting server...', config.port)
    app.listen(config.port, () => {
      
      console.log(`Server running on port ${config.port} 🏃🏽‍♂️‍➡️`)
    })
  } catch (error) {
    console.error(error)
  }
}

server()
