import mongoose from 'mongoose'


export const connectDb =async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected db')
        
    } catch (error) {
        console.error('error: ',error)
    }
}