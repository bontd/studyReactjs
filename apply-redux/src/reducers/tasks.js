import * as types from './../constants/ActionTypes';

var s4 = () => {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
}

var generateId = () => {
    return s4() +'-'+ s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

var findIndex = (tasks, id) => {
    var result = -1;
    tasks.forEach((task, index) => {
        if( task.id === id){
            return result = index
        }
    })
    return result
}

var data = JSON.parse(localStorage.getItem('task'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action ) =>{
	var id = '';
    var index = -1;

	switch(action.type){
		case types.LIST_ALL:
			return state;
		case types.SAVE_TASK: 
			var newTask = {
				id: action.task.id,
				name: action.task.name,
				status: action.task.status
			};
			if(!action.task.id){
				newTask.id = generateId();
				state.push(newTask);
			}else {
				index = findIndex(state, newTask.id);
				state[index] = newTask;
			}

			localStorage.setItem('task', JSON.stringify(state));
			return [ ...state ];
		case types.UPDATE_STATUS:
			id = action.id
	        index = findIndex(state,id);
	        
            // state[index].status = !state[index].status;
            // var cloneTask = { ...state[index] }
            // cloneTask.status = !cloneTask.status;
            // state[index] = cloneTask;

            state[index] = {
            	...state[index],
            	status: ! state[index].status
            }

            localStorage.setItem('task', JSON.stringify(state));
			return [...state ];
		case types.DELETE_TASK:
			id = action.id;
	        index = findIndex(state,id);

	        state.splice(index,1);
	        localStorage.setItem('task', JSON.stringify(state));

			return [...state];
		default : 
			return state;
	}
}

export default myReducer;