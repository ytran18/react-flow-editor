import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    Background,
    Controls,
    getIncomers,
    getOutgoers,
    getConnectedEdges
} from 'reactflow';

import ToolBar from './components/ToolBar';

import 'reactflow/dist/style.css';

import './App.css';

const initialNodes = [
    {
        id: '0',
        type: 'input',
        data: { label: 'Node' },
        position: { x: 0, y: 50 },
    },
];

let id = 1;
const getId = () => `${id++}`;

const AddNodeOnEdgeDrop = () => {

    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [state, setState] = useState({
        currNodeTitle: '',
        currNodeId: '',
        currNodeBg: '#eee',
        currNodeBorderColor: '#000',
        currNodeShadowColor: '',
    });

    const { screenToFlowPosition } = useReactFlow();

    //  Change node title
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === state.currNodeId) {
                    node.data = {
                        ...node.data,
                        label: state.currNodeTitle,
                    };
                }
        
                return node;
            })
        );
    }, [state.currNodeTitle, setNodes]);

    // Change node background
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === state.currNodeId) {
                    node.style = {
                        ...node.style,
                        backgroundColor: state.currNodeBg, 
                    };
                }
        
                return node;
            })
        );
    }, [state.currNodeBg, setNodes]);

    // Change node border color
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === state.currNodeId) {
                    node.style = {
                        ...node.style,
                        borderColor: state.currNodeBorderColor, 
                    };
                }
        
                return node;
            })
        );
    }, [state.currNodeBorderColor, setNodes]);

    const onConnect = useCallback((params) => {
        connectingNodeId.current = null;
        setEdges((eds) => addEdge(params, eds))
    },[]);

    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
    }, []);

    const onConnectEnd = useCallback((event) => {
        if (!connectingNodeId.current) return;

        const targetIsPane = event.target.classList.contains('react-flow__pane');

        if (targetIsPane) {
            // we need to remove the wrapper bounds, in order to get the correct position
            const id = getId();
            const newNode = {
                id,
                position: screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                }),
                data: { label: `Node ${id}` },
                origin: [0.5, 0.0],
            };

            setNodes((nds) => nds.concat(newNode));
            setEdges((eds) =>
                eds.concat({ id, source: connectingNodeId.current, target: id }),
            );
        }
    },[screenToFlowPosition]);

    const onNodesDelete = useCallback((deleted) => {
        setEdges(deleted?.reduce((acc, node) => {
            const incomers = getIncomers(node, nodes, edges);
            const outgoers = getOutgoers(node, nodes, edges);
            const connectedEdges = getConnectedEdges([node], edges);

            const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

            const createdEdges = incomers.flatMap(({ id: source }) =>
                outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
            );

            return [...remainingEdges, ...createdEdges];
        }, edges));
    },[nodes, edges]);

    const onNodeClick = (event, node) => {
        setState(prev => ({...prev, currNodeId: node?.id, currNodeTitle: node?.data?.label}));
    };

    // handle change curr node title
    const handleChangeText = (e, textType) => {
        if (textType === 'title') {
            setState(prev => ({...prev, currNodeTitle: e?.target?.value}));
        };
    };

    // handle change curr node color (bg, border, ...)
    const handleChangeColor = (color, type) => {
        const typeChange = {
            'currBackground': 'currNodeBg',
            'currBorderColor': 'currNodeBorderColor',
            'currShadowColor': 'currNodeShadowColor',
        }[type];
        setState(prev => ({...prev, [typeChange]: color}));
    };

    return (
        <div className="w-screen h-screen" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onConnectStart={onConnectStart}
                onConnectEnd={onConnectEnd}
                onNodesDelete={onNodesDelete}
                onNodeClick={onNodeClick}
                fitView
                fitViewOptions={{ padding: 2 }}
                nodeOrigin={[0.5, 0]}
            >
                <Controls />
                <Background />
                <ToolBar 
                    currNodeTitle={state.currNodeTitle}
                    currNodeBg={state.currNodeBg}
                    currNodeBorderColor={state.currNodeBorderColor}
                    handleChangeText={handleChangeText}
                    handleChangeColor={handleChangeColor}
                />
            </ReactFlow>
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
);
