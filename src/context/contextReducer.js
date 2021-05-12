// Reducer => a function that takes in the old state, and an action. Returns a new state

let transactions;

const contextReducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      transactions = state.filter((t) => t.id !== action.payload);

      localStorage.setItem('transactions', JSON.stringify(transactions));

      return transactions; 
      break;
      case 'ADD_TRANSACTION':
        transactions = [action.payload, ...state];

        localStorage.setItem('transactions', JSON.stringify(transactions));

        return transactions;
        break;
    default:
      return state;
  }
  
}

export default contextReducer;