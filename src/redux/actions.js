import { CLEAR, UPDATE_NODE, UPDATE_EDGE, UPDATE_STEP } from './constants';

export const updateNodes = (node) => ({
    type: UPDATE_NODE,
    payload: node,
});

export const updateEdges = (edge) => ({
    type: UPDATE_EDGE,
    payload: edge,
});

export const updateStep = (step) => ({
    type: UPDATE_STEP,
    payload: step,
});

// remove all state of a reducer
export const clear = () => ({
    type: CLEAR,
})