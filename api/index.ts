import express, { Request, Response } from 'express';

import SpecificationRouter from './resources/specification/specification.router'
import ComponentRouter from './resources/component/component.router'
import GroupRouter from './resources/group/group.router'
import PartRouter from './resources/part/part.router'
import StuffRouter from './resources/stuff/stuff.router'

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send("A factory called \"Stuffs are just Stuffs\" produces, well, Stuffs.");
});

app.use('/specifications', SpecificationRouter);
app.use('/components', ComponentRouter);
app.use('/groups', GroupRouter);
app.use('/parts', PartRouter);
app.use('/stuff', StuffRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});