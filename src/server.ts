import { app } from "./app";
import mongoose from "mongoose";


mongoose.connect('mongodb://localhost:27017/27017').then(() => {
    console.log('MongoDB conectado');
}).catch((error) => {
    console.error(error);
    process.exit(1);
})

app.listen({
    port: 3000,
}, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server rodando em ${address}`);
})