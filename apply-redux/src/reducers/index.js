import { combineReducers } from 'redux';
import tasks from './tasks';
import toggleForm from './toggleForm';
import itemEditing from './itemEditing';


const myReducer = combineReducers({
	tasks : tasks,
	isDisplayForm: toggleForm,
	itemEditing: itemEditing
});

export default myReducer;