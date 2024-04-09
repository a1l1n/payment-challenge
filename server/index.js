// Important: this project uses the ECMAScript Modules (ESM) syntax
//********************************************************************

import app from './src/app.js';
import { sequelize } from "./src/db/db.js";

async function main() {
    try {
        await sequelize.sync({ force: false })
        app.listen(process.env.PORT)
        console.log("server listening in ", process.env.PORT)
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

main();