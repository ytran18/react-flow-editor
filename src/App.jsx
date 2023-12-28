import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    useReactFlow,
    ReactFlowProvider,
    Background,
    getIncomers,
    getOutgoers,
    getConnectedEdges,
    updateEdge,
} from 'reactflow';

import ToolBar from './components/ToolBar';
import Node from './components/Node';
import Shape from './components/Shape';
import Controls from './components/Controls';
import Hexagon from './components/Node/Hexagon';
import Diamond from './components/Node/Diamond';
import ArrowRetangle from './components/Node/ArrowRetangle';
import Triangle from './components/Node/Triangle';
import Parallelogram from './components/Node/Parallelogram';

import 'reactflow/dist/style.css';

import './App.css';

let id = 1;
const getId = () => `${id++}`;

const nodeTypes = {
    custom: Node,
    hexagon: Hexagon,
    diamond: Diamond,
    arrowRetangle: ArrowRetangle,
    triangle: Triangle,
    parallelogram: Parallelogram,
};

const AddNodeOnEdgeDrop = () => {

    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const [state, setState] = useState({
        currNodeTitle: '',
        currNodeId: '',
        currNodeBg: '#eee',
        currNodeBorderColor: '#000',
        currNodeShadowColor: '',
        currNodeFontSize: 14,
        currNodeFont: '',
        currNodeFontWeight: 'Normal',
        currNodeBorderStyle: 'solid',
        currNodeTitleColor: '#000',
        currNodeHexagonBgColor: '#eee',
        isShowToolBar: false,
        targetEdgeId: '',
        preventOnConnectEnd: false,
    });
    
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const { screenToFlowPosition, setViewport } = useReactFlow();

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
                        backgroundColor: (node.type === 'hexagon' || node.type === 'diamond' || node.type === 'arrowRetangle' || node.type === 'triangle') ? 'none' : state.currNodeBg, 
                        hexagonBg: state.currNodeBg !== 'none' ? state.currNodeBg : '#eee',
                        diamondBg: state.currNodeBg !== 'none' ? state.currNodeBg : '#eee',
                        arrowRectangleBg: state.currNodeBg !== 'none' ? state.currNodeBg : '#eee',
                        triangleBg: state.currNodeBg !== 'none' ? state.currNodeBg : '#eee',
                        parallelogramBg: state.currNodeBg !== 'none' ? state.currNodeBg : '#eee',
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

    // Change node font size
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === state.currNodeId) {
                    node.style = {
                        ...node.style,
                        fontSize: `${state.currNodeFontSize}px`, 
                    };
                }
        
                return node;
            })
        );
    }, [state.currNodeFontSize, setNodes]);

    // Change node text color
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === state.currNodeId) {
                    node.style = {
                        ...node.style,
                        color: state.currNodeTitleColor, 
                    };
                }
        
                return node;
            })
        );
    }, [state.currNodeTitleColor, setNodes]);

    // Change node border style
    useEffect(() => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === state.currNodeId) {
                    node.style = {
                        ...node.style,
                        borderStyle: state.currNodeBorderStyle, 
                    };
                }
        
                return node;
            })
        );
    }, [state.currNodeBorderStyle, setNodes]);

    // Change node font style
    useEffect(() => {
        const value = {
            'Thin': 100,
            'Extra Light':200,
            'Light': 300,
            'Normal': 400,
            'Medium': 500,
            'Semi Bold': 600,
            'Bold': 700,
            'Extra Bold': 800,
            'Black': 900,
        }[state.currNodeFontWeight];

        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === state.currNodeId) {
                    node.style = {
                        ...node.style,
                        fontWeight: value, 
                    };
                }
        
                return node;
            })
        );
    }, [state.currNodeFontWeight, setNodes]);

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
            const id = getId();
            const newNode = {
                id,
                type: 'custom',
                position: screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                }),
                data: { label: `Node ${id}`, isRootNode: false, shape:'default' },
                origin: [0.5, 0.0],
                style: {
                    backgroundColor: '#eee',
                    borderColor: '#000',
                    fontSize: '14px',
                    borderStyle: 'solid',
                    color: '#000',
                    fontWeight: 400,
                    borderWidth: '1px',
                }
            };
            
            setNodes((nds) => nds.concat(newNode));
            setEdges((eds) =>
                eds.concat({ id, source: connectingNodeId.current, target: id }),
            );

            const fontSize = newNode?.style?.fontSize?.replace(/\D/g, '');

            const fontWeight = {
                100: 'Thin',
                200: 'Extra Light',
                300: 'Light',
                400: 'Normal',
                500: 'Medium',
                600: 'Semi Bold',
                700: 'Bold',
                800: 'Extra Bold',
                900: 'Black',
            }[newNode?.style?.fontWeight];

            setState(prev => ({
                ...prev,
                currNodeId: id,
                currNodeTitle: newNode?.data?.label || 'Node',
                // isShowToolBar: true,
                currNodeBg: newNode?.style?.backgroundColor || '#eee',
                currNodeBorderStyle: newNode?.style?.borderStyle || 'solid',
                currNodeTitleColor: newNode?.style?.color || '#000',
                currNodeFontSize: fontSize || 14,
                currNodeFontWeight: fontWeight || 'Normal',
                currNodeBorderColor: newNode?.style?.borderColor || '#000',
            }))
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

        setState(prev => ({...prev, isShowToolBar: false}));
    },[nodes, edges]);

    const onNodeClick = (event, node) => {
        const fontSize = node?.style?.fontSize?.replace(/\D/g, '');

        const fontWeight = {
            100: 'Thin',
            200: 'Extra Light',
            300: 'Light',
            400: 'Normal',
            500: 'Medium',
            600: 'Semi Bold',
            700: 'Bold',
            800: 'Extra Bold',
            900: 'Black',
        }[node?.style?.fontWeight];

        setState(prev => ({
            ...prev,
            currNodeId: node?.id,
            currNodeTitle: node?.data?.label || 'Node',
            isShowToolBar: true,
            currNodeBg: node?.style?.backgroundColor || '#eee',
            currNodeBorderStyle: node?.style?.borderStyle || 'solid',
            currNodeTitleColor: node?.style?.color || '#000',
            currNodeFontSize: fontSize || 14,
            currNodeFontWeight: fontWeight || 'Normal',
            currNodeBorderColor: node?.style?.borderColor || '#000',
        }));
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
            'currColor': 'currNodeTitleColor',
            'currBackground': 'currNodeBg',
            'currBorderColor': 'currNodeBorderColor',
            'currShadowColor': 'currNodeShadowColor',
        }[type];
        setState(prev => ({...prev, [typeChange]: color}));
    };

    // handle change curr node font size
    const handleChangeInputPicker = (value, type) => {
        const typeChange = {
            'font': 'currNodeFont',
            'font-size': 'currNodeFontSize',
            'font-weight': 'currNodeFontWeight',
            'border-style': 'currNodeBorderStyle'
        }[type];
        setState(prev => ({...prev, [typeChange]: value}));
    };

    const handleShowToolBar = () => {
        setState(prev => ({...prev, isShowToolBar: !prev.isShowToolBar}));
    };

    const onEdgeClick = (event, node) => {

    };

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },[]);

    const onLoad = (_reactFlowInstance) => {
        setReactFlowInstance(_reactFlowInstance);
    };

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    },[]);

    const onDrop = useCallback((event) => {
        event.preventDefault();
    
        const type = event.dataTransfer.getData('application/reactflow');
    
        if (typeof type === 'undefined' || !type) {
            return;
        };
    
        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const id = getId();

        const customType = {
            'hexagon': 'hexagon',
            'diamond': 'diamond',
            'arrow-retangle': 'arrowRetangle',
            'triangle': 'triangle',
            'parallelogram': 'parallelogram'
        }[type] || 'custom';

        const bgRadius = {
            'circle': '9999px',
            'rounded-retangle': '10px',
        }[type] || '0px';

        const background = {
            'hexagon': 'none',
            'diamond': 'none',
            'arrow-retangle': 'none',
            'triangle': 'none',
            'parallelogram': 'none'
        }[type] || '#eee';

        const borderWidth = {
            'hexagon': 'none',
            'diamond': 'none',
            'arrow-retangle': 'none',
            'triangle': 'none',
            'parallelogram': 'none'
        }[type] || '1px';

        let style = {
            backgroundColor: background,
            borderColor: '#000',
            fontSize: '12px',
            borderStyle: 'solid',
            color: '#000',
            fontWeight: 400,
            borderWidth: borderWidth,
            borderRadius: bgRadius,
        };

        const newNode = {
            id: id,
            type: customType,
            position,
            data: { label: `Node ${id}`, isRootNode: false, shape: type, id: id },
            origin: [0.5, 0.0],
            style: style
        };
    
        setNodes((nds) => nds.concat(newNode));
    },[reactFlowInstance]);

    const handleTransform = () => {
        const newViewPort = reactFlowInstance.fitView();
        setViewport(newViewPort);
    };

    return (
        <>
            <div className="w-full h-full" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    nodeTypes={nodeTypes}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}
                    onNodesDelete={onNodesDelete}
                    onNodeClick={onNodeClick}
                    onEdgeClick={onEdgeClick}
                    onEdgeUpdate={onEdgeUpdate}
                    onLoad={onLoad}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                    onInit={setReactFlowInstance}
                    fitView
                    snapToGrid
                    fitViewOptions={{ padding: 2 }}
                    style={{background: 'rgb(226,232,240)'}}
                >
                    <Controls handleTransform={handleTransform}/>
                    <Background />
                    <ToolBar 
                        isShowToolBar={state.isShowToolBar}
                        currNodeTitle={state.currNodeTitle}
                        currNodeBg={state.currNodeBg}
                        currNodeBorderColor={state.currNodeBorderColor}
                        currNodeFontSize={state.currNodeFontSize}
                        currNodeTitleColor={state.currNodeTitleColor}
                        currNodeId={state.currNodeId}
                        currNodeFontWeight={state.currNodeFontWeight}
                        currNodeBorderStyle={state.currNodeBorderStyle}
                        handleChangeText={handleChangeText}
                        handleChangeColor={handleChangeColor}
                        handleShowToolBar={handleShowToolBar}
                        handleChangeInputPicker={handleChangeInputPicker}
                    />
                </ReactFlow>
            </div>
            <Shape />
        </>
    );
};

export default () => (
    <div className='w-screen h-screen'>
        <ReactFlowProvider>
            <AddNodeOnEdgeDrop />
        </ReactFlowProvider>
    </div>
);
