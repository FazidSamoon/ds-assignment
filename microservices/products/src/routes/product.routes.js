import Express from 'express';

const productsRouter = Express.Router();

productsRouter.get('/', (req, res) => {
    res.send('Hello from products');
});

productsRouter.post('/', (req, res) => {
    res.send('Hello from products');
});

productsRouter.patch('/:id', (req, res) => {
    res.send('Hello from products');
});

productsRouter.delete('/:id', (req, res) => {
    res.send('Hello from products');
});

export default productsRouter;
