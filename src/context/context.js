import React, { useReducer, createContext } from 'react';

import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [{"amount":75,"category":"Shopping","type":"Expense","date":"2021-05-04","id":"af9c8fdc-f51e-4fd3-964b-5de9964ee2b0"},{"amount":105,"category":"Bills","type":"Expense","date":"2021-05-04","id":"73f17b93-5595-450d-b1fa-4fb73c0dec42"},{"amount":50,"category":"Deposits","type":"Income","date":"2021-05-04","id":"e9c26296-77ab-4a52-bd79-9174ac55cf70"},{"amount":100,"category":"Investments","type":"Income","date":"2021-05-04","id":"03be182b-0ae8-45a0-a8ce-a636004876d3"},{"amount":250,"category":"Business","type":"Income","date":"2021-05-03","id":"4714e58c-210a-4a32-a807-f2d6a8bdd55c"}];

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState); 
  // Action Creators
  const deleteTransaction = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id});
  const addTransaction = (transaction) => dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
  
  const balance = transactions.reduce((acc, currVal) => {
    return (currVal.type === 'Expense' ? acc - currVal.amount : acc + currVal.amount);
  }, 0);

  return (
    <ExpenseTrackerContext.Provider value={{ 
      deleteTransaction,
      addTransaction,
      transactions,
      balance
     }}>
      {children}
    </ExpenseTrackerContext.Provider>
  )
}
