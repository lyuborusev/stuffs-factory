// import app from '../../api/server'
import app from '../api/server'
import { initializeDatasource } from "../api/database/datasource";

let server: any | null = null;
beforeAll(async () => {
    await initializeDatasource();
    server = app.listen(3000);
});

// afterAll(async () => {
//     await new Promise(resolve => server.close(resolve));
// });