import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { TokenController } from './controllers/TokenController';
import { TransactionController } from './controllers/TransactionController';
import LoginRequired from './middlewares/LoginRequired';

const userController = new UserController();
const tokenController = new TokenController();
const transactionController = new TransactionController();

export const router = Router();

router.post('/user/create', userController.create);
router.post('/api/auth', tokenController.create);

router.post('/transactions', LoginRequired, transactionController.createTransaction);

router.get('/transactions/:id?', LoginRequired, transactionController.getTransactions);
router.get('/transactions/withdraw/:id?', LoginRequired, transactionController.getWithdraws);
router.get('/transactions/deposit/:id?', LoginRequired, transactionController.getDeposits);

router.patch('/transactions/update/:id', LoginRequired, transactionController.updateTransaction);
router.delete('/transactions/delete/:id', LoginRequired, transactionController.deleteTransaction);
