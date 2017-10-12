
export const DISPLAY_BLOCK ='DISPLAY_BLOCK';
export const DISPLAY_NONE = 'DISPLAY_NONE';
export function showNavList(){
	return {
		type: DISPLAY_BLOCK
	}
};


export function hideNavList(){
	return {
		type:DISPLAY_NONE
	}
}