import { createStore } from 'redux';

import { status, sort } from './actions/index';
import myReducer from './reducers/index';


const store = createStore(myReducer);

console.log('default: ', store.getState());
// thực hiện công việc toggle status

store.dispatch(status());

console.log('Change: ', store.getState());
// thực hiện công việc sắp xếp name Z-A

store.dispatch(sort({by: 'name', value: -1}));
console.log('Sort: ', store.getState());