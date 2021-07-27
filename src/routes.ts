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

router.post('/transactions/deposit/create', LoginRequired, transactionController.createDeposit);
router.get('/transactions/deposit/:id?', LoginRequired, transactionController.getDeposits);

router.post('/transactions/withdraw/create', LoginRequired, transactionController.createWithdraw);
router.get('/transactions/withdraw/:id?', LoginRequired, transactionController.getWithdraws);

router.get('/transactions/index/:id?', LoginRequired, transactionController.getTransactions);
router.patch('/transactions/update/:id', LoginRequired, transactionController.updateTransaction);
router.delete('/transactions/delete/:id', LoginRequired, transactionController.getTransactions);
