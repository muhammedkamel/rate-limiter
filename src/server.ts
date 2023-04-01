import express from "express";

const app = express();

const port = 3000;

app.get('/', (req, res) => res.send('Hello world'));

// tslint:disable-next-line:no-console
app.listen(port, () => console.log(`Application started listening http://localhost:${port}`));