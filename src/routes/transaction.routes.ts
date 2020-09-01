import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

//--------------------- GET -----------------------------------

transactionRouter.get('/', (request, response) => {
  try {
    // -------- Get Balance and Transactions -------------
    const balance = transactionsRepository.getBalance();
    const transactions = transactionsRepository.all();

    //----------------- Return  --------------------------
    return response.json({ transactions, balance });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

//--------------------- POST ----------------------------------

transactionRouter.post('/', (request, response) => {
  try {
    //-------------- Get Body -----------------------------
    const { title, value, type } = request.body;

    //---------- Connect to Service --------------------------
    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    //------- Create and Validade Transaction in Repository ---------
    const transaction = createTransaction.execute({ title, value, type });

    //----------------- Return  --------------------------
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
