import mongoose, { ConnectOptions } from 'mongoose'
import config from '../../config.json'

async function connect() {
  try {
    mongoose.connect(config.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions, (err) => {
      if(err) {
        return err;
      }
      console.log('MONGODB - Connected with success')
    })
  } catch(err) {
    console.log(err)
  }
}

export { connect }