import { DISPLAY_BLOCK, DISPLAY_NONE } from '../actions/indexAction'

export default function index(state = {
	navList: false
} ,action){
	if(action.type == DISPLAY_BLOCK){
			var state1 = {
				aa :state.aa,
				navList: true
			}
		return state1;
	}else if(action.type == DISPLAY_NONE){
		var state1 = {
				aa :state.aa,
				navList: false
			}
		return state1
	}else{
		return state
	}
}

