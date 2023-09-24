import React from 'react';
import { Header } from './Expensecomponents/Header';
import { Balance } from './Expensecomponents/Balance';
import { IncomeExpenses } from './Expensecomponents/IncomeExpenses';
import { TransactionList } from './Expensecomponents/TransactionList';
import { AddTransaction } from './Expensecomponents/AddTransaction';

import { GlobalProvider } from './context/GlobalState';

import './ExpenseTracker.css';

function ExpenseTracker() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default ExpenseTracker;
