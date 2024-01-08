export const selectFlowReducer = (state) => {
    return state.flowReducer;
};

export const flowPackageSelector = (state) => {
    return selectFlowReducer(state);
};