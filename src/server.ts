import app from "./app";
import config from "./app/config";

app.listen(config.port, () => {
    console.log(`Mongoose Express CRUD on Port: ${config.port}`);
})