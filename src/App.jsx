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
import Cylinder from './components/Node/Cylinder';
import Plus from './components/Node/Plus';
import Circle from './components/Node/Circle';
import RoundedRectangle from './components/Node/RoundedRectangle';
import Rectangle from './components/Node/Rectangle';

import { getFontWeigth, getNodeBackgroundColor, getNodeBorderWidth, getNodeType } from './functions';

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
    cylinder: Cylinder,
    plus: Plus,
    circle: Circle,
    roundedRectangle: RoundedRectangle,
    rectangle: Rectangle,
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
        currNodeFontSize: 8,
        currNodeFont: '',
        currNodeFontWeight: 'Normal',
        currNodeBorderStyle: 'solid',
        currNodeTitleColor: '#000',
        currNodeHexagonBgColor: '#eee',
        isShowToolBar: false,
        targetEdgeId: '',
        preventOnConnectEnd: false,
        currNodeType: '',
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
                    const condition = ['hexagon', 'diamond', 'arrowRetangle', 'triangle', 'parallelogram', 'cylinder', 'plus'].includes(node.type);
                    const backgroundColor = condition ? 'none' : state.currNodeBg;

                    node.style = {
                        ...node.style,
                        backgroundColor: backgroundColor,
                        [`${node.type}Bg`]: state.currNodeBg !== 'none' ? state.currNodeBg : '#eee',
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
        const value = getFontWeigth(state.currNodeFontWeight, 'number');

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
                data: { label: `Node ${id}`, isRootNode: false, shape:'default', isSelected: true, id: id },
                origin: [0.5, 0.0],
                style: {
                    backgroundColor: '#eee',
                    borderColor: '#000',
                    fontSize: '8px',
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

            const fontWeight = getFontWeigth(newNode?.style?.fontWeight, 'label');

            state.currNodeId = id;
            state.preventOnConnectEnd = true;

            setState(prev => ({
                ...prev,
                currNodeId: id,
                currNodeTitle: newNode?.data?.label || 'Node',
                // isShowToolBar: true,
                currNodeBg: newNode?.style?.backgroundColor || '#eee',
                currNodeBorderStyle: newNode?.style?.borderStyle || 'solid',
                currNodeTitleColor: newNode?.style?.color || '#000',
                currNodeFontSize: fontSize || 8,
                currNodeFontWeight: fontWeight || 'Normal',
                currNodeBorderColor: newNode?.style?.borderColor || '#000',
                preventOnConnectEnd: true,
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

        const updatedNodes = nodes.map(nds => {
            if (nds.id === node.id) {
                return {
                    ...nds,
                    data: {
                        ...nds.data,
                        isSelected: true
                    }
                };
            } else {
                return {
                    ...nds,
                    data: {
                        ...nds.data,
                        isSelected: false
                    }
                };
            }
        });          

        setNodes(updatedNodes);

        state.currNodeId = node?.id;
        setState(prev => ({
            ...prev,
            currNodeId: node?.id,
            currNodeTitle: node?.data?.label || 'Node',
            isShowToolBar: true,
            currNodeBg: node?.style?.backgroundColor || '#eee',
            currNodeBorderStyle: node?.style?.borderStyle || 'solid',
            currNodeTitleColor: node?.style?.color || '#000',
            currNodeFontSize: fontSize || 8,
            currNodeFontWeight: fontWeight || 'Normal',
            currNodeBorderColor: node?.style?.borderColor || '#000',
            currNodeType: node?.type,
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
            'border-style': 'currNodeBorderStyle',
            'shape': 'currNodeType',
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

        const customType = getNodeType(type);
        const background = getNodeBackgroundColor(type);
        const borderWidth = getNodeBorderWidth(type);

        let style = {
            backgroundColor: background,
            borderColor: '#000',
            fontSize: '8px',
            borderStyle: 'solid',
            color: '#000',
            fontWeight: 400,
            borderWidth: borderWidth,
        };

        const newNode = {
            id: id,
            type: customType,
            position,
            data: { label: `Node ${id}`, isRootNode: false, shape: type, id: id, isSelected: true },
            origin: [0.5, 0.0],
            style: style
        };
    
        setNodes((nds) => nds.concat(newNode));

        state.currNodeId = id;
        setState(prev => ({...prev, currNodeId: id}));
    },[reactFlowInstance]);

    useEffect(() => {
        if (state.currNodeId) {
            const updatedNodes = nodes.map(nds => {
                if (nds.id === state.currNodeId) {
                    return {
                        ...nds,
                        data: {
                            ...nds.data,
                            isSelected: true
                        }
                    };
                } else {
                    return {
                        ...nds,
                        data: {
                            ...nds.data,
                            isSelected: false
                        }
                    };
                }
            });    
            
            setNodes(updatedNodes);
        };
    },[state.currNodeId]);

    const handleTransform = () => {
        const newViewPort = reactFlowInstance.fitView();
        setViewport(newViewPort);
    };

    const onPaneClick = () => {
        if (state.preventOnConnectEnd) {
            state.preventOnConnectEnd = false;
            setState(prev => ({...prev, preventOnConnectEnd: false}));
            return;
        };

        const updatedNodes = nodes.map(nds => {
            return {
                ...nds,
                data: {
                    ...nds.data,
                    isSelected: false
                }
            };
        });

        setNodes(updatedNodes);
        setState(prev => ({...prev, isShowToolBar: false}));
    };

    // change curr node type
    useEffect(() => {
        if (state.currNodeType) {
            const updatedNodes = nodes.map(nds => {
                
                if (nds.id === state.currNodeId) {
                    let style = nds?.style;
                    const bg = state.currNodeBg || '#eee';
                    style.backgroundColor = state.currNodeType === 'custom' ? bg : 'none';
                    style.borderWidth = state.currNodeType === 'custom' ? '1px' : 'none';
                    if (state.currNodeType !== 'custom') style[`${state.currNodeType}Bg`] = state.currNodeBg !== 'none' ? state.currNodeBg : '#eee';
    
                    return {
                        ...nds,
                        type: state.currNodeType,
                        style: style,
                    };
                } else {
                    return nds;
                }
            });

            setNodes(updatedNodes);
        }
    },[state.currNodeType]);

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
                    onPaneClick={onPaneClick}
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
                        currNodeType={state.currNodeType}
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
