import mongoose from 'mongoose'
import dns from 'dns'


const connectDb = async()=>{
    try {

        dns.setServers(["1.1.1.1", "8.8.8.8"]);     
        const connt = await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfuly")

    } catch (error) {
        console.log(error)
        process.exit(1);

    }
}

export default connectDb;