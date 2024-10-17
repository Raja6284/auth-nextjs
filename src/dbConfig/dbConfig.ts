import mongoose  from "mongoose";

export async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URI!,{
            dbName: "nextAuth",  // Replace 'myDatabase' with the name of your database
          })
        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("MongoDB successfully connected")
        })

        connection.on('error',(err)=>{
            console.log('MongoDB connection error! Please make sure MongoDB is running:',err)
            process.exit(1)
        })
        
    }catch(error){
        console.log("Something went worong")
        console.log(error)
    }
}