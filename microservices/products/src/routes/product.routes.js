import Express from 'express';
import { createProduct, deleteProduct, getAllProducts, updateProduct, getProduct, updateProductQuantity } from '../controllers/product';
import { verifyAccessToken, verifySeller } from '../middlewares/authentication';

const productsRouter = Express.Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getProduct);
productsRouter.post('/', verifyAccessToken, verifySeller, createProduct);
productsRouter.patch('/:id', verifyAccessToken, verifySeller, updateProduct);
productsRouter.patch('/quantity/:id', updateProductQuantity);
productsRouter.delete('/:id', verifyAccessToken, verifySeller, deleteProduct);

export default productsRouter;
