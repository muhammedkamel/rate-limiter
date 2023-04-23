import * as dotenv from "dotenv";
dotenv.config();
import { app } from "./router";

// tslint:disable-next-line:no-console
app.listen(process.env.PORT, () => console.log(`Application started listening http://localhost:${process.env.PORT}`));
