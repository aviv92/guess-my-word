const bestScore = 0;
const reducer = (state = bestScore, action) => {
	if (action.type === "SET_HIGH_SCORE") {
		return action.value;
	}
	return state;
};

export default reducer;
