import express from "express";
import cors from "cors";
import {initializeDB} from "./database.js";
import usersRouter from "./routes/users.js";
import {readFile} from "fs/promises";
import swaggerUi from "swagger-ui-express";
const swaggerDocument = JSON.parse(await readFile(new URL("./swagger-output.json", import.meta.url)));

const app = express();

app.get("/", (req, res) => {
    res.send("Welcome to my page :)");
});

app.use(cors());
app.use(express.json())
app.use("/api-docs", swaggerUi.setup(swaggerDocument));
app.use("/app/users", usersRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({message: err.message});
});


const startServer = async () =>{
    await initializeDB();
    app.listen(3000, () => console.log("Server is running on port 3000"));
}

startServer();