import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    MiniMap,
    Background,
    Controls,
    getIncomers,
    getOutgoers,
    getConnectedEdges
} from 'reactflow';

import ToolBar from './components/ToolBar';

import 'reactflow/dist/style.css';

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

    const { screenToFlowPosition } = useReactFlow();

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
        setEdges(deleted.reduce((acc, node) => {
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
                fitView
                fitViewOptions={{ padding: 2 }}
                nodeOrigin={[0.5, 0]}
            >
                <MiniMap />
                <Controls />
                <Background />
                <ToolBar />
            </ReactFlow>
        </div>
    );
};

export default () => (
    <ReactFlowProvider>
        <AddNodeOnEdgeDrop />
    </ReactFlowProvider>
);
