import { CLEAR, UPDATE_EDGE, UPDATE_NODE, UPDATE_STEP } from "./constants";

const flowState = {
    flow: {
        nodes: [],
        edges: [],
    },
    step: -1,
};

export const flowReducer = (state = flowState, action) =>
{
    switch (action.type)
    {
        case UPDATE_NODE: {
            const updatedNodes = action.payload;
            const mergedNodes = [...state.flow.nodes, ...updatedNodes];
            const updatedFlow = {
                ...state.flow,
                nodes: mergedNodes,
            };
        
            return {
                ...state,
                flow: updatedFlow,
            };
        }
        
        case UPDATE_EDGE:{
            const updateFlow = {
                ...state.flow,
                edges: action.payload,
            };
            return { ...state, flow: updateFlow };
        }
        case UPDATE_STEP:{
            return { ...state, step: action.payload };
        }
        case CLEAR:{
            return {
                flow: {
                    nodes: [],
                    edges: [],
                },
                step: -1,
            };
        }
        default:
            return state;
    }
};