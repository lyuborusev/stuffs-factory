import server from './server';
import { initializeDatasource } from './database/datasource';

const main = async () => {
    await initializeDatasource();

    const port = process.env.PORT || 3000;
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

main().catch((error) => console.error(error));