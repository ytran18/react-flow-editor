import { CLEAR, UPDATE_EDGE, UPDATE_NODE, UPDATE_STEP } from "./constants";

const flowState = {
    flow: {
        nodes: [],
        edges: [],
    },
    step: 0,
};

export const flowReducer = (state = flowState, action) =>
{
    switch (action.type)
    {
        case UPDATE_NODE: {
            const updatedNodes = action.payload;
            const flowNodes = state.flow.nodes;
            flowNodes.push(updatedNodes);

            const updatedFlow = {
                ...state.flow,
                nodes: flowNodes,
            };
        
            return {
                ...state,
                flow: updatedFlow,
            };
        }
        
        case UPDATE_EDGE:{
            const updatedEdges = action.payload;
            const flowEdges = state.flow.edges;
            flowEdges.push(updatedEdges);

            const updatedFlow = {
                ...state.flow,
                edges: flowEdges,
            };
        
            return {
                ...state,
                flow: updatedFlow,
            };
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
                step: 0,
            };
        }
        default:
            return state;
    }
};