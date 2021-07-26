import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { TokenController } from './controllers/TokenController';
import { TransactionController } from './controllers/TransactionController';
import LoginRequired from './middlewares/LoginRequired';

const userController = new UserController()
const tokenController = new TokenController()
const transactionController = new TransactionController()

export const router = Router()

router.post('/user/create', userController.create);
router.post('/api/auth', tokenController.create);

router.post('/transaction/deposit/create', LoginRequired, transactionController.createDeposit);
router.get('/transaction/deposit/index', LoginRequired, transactionController.getDeposits);

router.post('/transaction/withdraw/create', LoginRequired, transactionController.createWithdraw);
router.get('/transaction/withdraw/index', LoginRequired, transactionController.getWithdraws);
