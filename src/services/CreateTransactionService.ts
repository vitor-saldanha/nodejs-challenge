import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    //-------------- Get Total Balance of Transactions -------------
    const { total } = this.transactionsRepository.getBalance();

    //---------- Test if Current Transaction is Valid -------------
    if (type === 'outcome' && total - value < 0) {
      throw Error("You don't have enought money!");
    }

    //---------- Call Repository to Create Transaction -----------
    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
