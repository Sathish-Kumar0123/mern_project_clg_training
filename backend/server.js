require("dotenv").config()

const app = require("./src/app")
const connectDB = require("./src/config/db");

const PORT = process.env.PORT //port 4000

async function startServer() {
    await connectDB();

    app.listen(PORT,()=>{
        console.log(`server is running:${PORT}`);
    });
    
}

startServer();