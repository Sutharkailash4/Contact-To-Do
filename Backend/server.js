import { configDotenv } from "dotenv";
configDotenv();
import app from "./src/app.js";
import ConnectedToMongodb from "./src/config/database.js";

const port = process.env.PORT || 3000;

const startServer = async () => {
    await ConnectedToMongodb();

    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
};

startServer();