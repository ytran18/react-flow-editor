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
    MarkerType,
} from 'reactflow';

import { useDispatch } from 'react-redux';
import { updateNodes, clear, updateStep, updateEdges } from './redux/actions';
import { useFlowPackageHook } from './redux/hooks';

import ToolBar from './components/ToolBar';
import Node from './components/Node';
import Shape from './components/Shape';
import Controls from './components/Controls';
import Hexagon from './components/Node/Hexagon';
import Diamond from './components/Node/Diamond';
import ArrowRectangle from './components/Node/ArrowRectangle';
import Triangle from './components/Node/Triangle';
import Parallelogram from './components/Node/Parallelogram';
import Cylinder from './components/Node/Cylinder';
import Plus from './components/Node/Plus';
import Circle from './components/Node/Circle';
import RoundedRectangle from './components/Node/RoundedRectangle';
import Rectangle from './components/Node/Rectangle';

import { getColorPickerState, getDefaultMarker, getEdgeTypeMarker, getFontWeigth, getInputPickerState,
         getMarkerStartAndEnd,
         getNodeBackgroundColor, getNodeBorderWidth, getNodeType, isShapeNode } from './functions';

import 'reactflow/dist/style.css';

import './App.css';

let id = 1;
const getId = () => `${id++}`;

const nodeTypes = {
    custom: Node,
    hexagon: Hexagon,
    diamond: Diamond,
    arrowRectangle: ArrowRectangle,
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

    const dispatch = useDispatch();

    const flowState = useFlowPackageHook();

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
        isShowToolBar: false,
        preventOnConnectEnd: false,
        currNodeType: '',
        currEdgeId: '',
        currEdgeLabel: '',
        currEdgeColor: '#333',
        currEdgeSize: '',
        currEdgeMarker: '',
        currEdgeType: '',
        currEdgeIsAnimated: false,
        toolbarTab: 0,
        isUndo: false,
        isRedo: false,
        isDispatch: false,
        isDisplayPopUpPage: false,
    });
    
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const { screenToFlowPosition, setViewport } = useReactFlow();

    useEffect(() => {
        const handleBeforeUnload = () => {
            let element = document.getElementById('icon-next');
            let backElemnt = document.getElementById('icon-back');
            element.style.opacity = '0.5';
            backElemnt.style.opacity = '0.5';
            dispatch(clear());
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        let timeout = null;

        setNodes((nds) => {
            return nds.map((node) => {
                if (node.id === state.currNodeId) {
                    const updatedData = {
                        ...node.data,
                        label: state.currNodeTitle,
                    };
    
                    const condition = isShapeNode(node.type);
                    const backgroundColor = condition ? 'none' : state.currNodeBg;
                    const value = getFontWeigth(state.currNodeFontWeight, 'number');
                    const updatedStyle = {
                        ...node.style,
                        backgroundColor: backgroundColor,
                        [`${node.type}Bg`]: state.currNodeBg !== 'none' ? state.currNodeBg : '#eee',
                        borderColor: state.currNodeBorderColor,
                        fontSize: `${state.currNodeFontSize}px`, 
                        color: state.currNodeTitleColor,
                        borderStyle: state.currNodeBorderStyle,
                        fontWeight: value,
                    };
    
                    return {
                        ...node,
                        data: updatedData,
                        style: updatedStyle,
                    };
                }
                return node;
            });
        });

        const delayed = () => {
            if (timeout) {
                state.isDispatch = false;
                setState(prev => ({...prev, isDispatch: false}));
                clearTimeout(timeout)
            } 
    
            timeout = setTimeout(() => {
                state.isDispatch = true;
                setState(prev => ({...prev, isDispatch: true}));
            }, 2000);
        };
        
        delayed();
        
        return () => {
            if (timeout) {
                state.isDispatch = false;
                setState(prev => ({...prev, isDispatch: false}));
                clearTimeout(timeout)
            }
        };

    }, [state.currNodeTitle, state.currNodeBg, state.currNodeBorderColor, state.currNodeFontSize,
        state.currNodeTitleColor, state.currNodeBorderStyle, state.currNodeFontWeight, setNodes]);
        
    useEffect(() => {
        if (state.isDispatch) {
            const step = flowState?.flow?.nodes?.length;
            dispatch(updateNodes(nodes));
            dispatch(updateEdges(edges));
            dispatch(updateStep(step));
        };
    },[state.isDispatch]);

    useEffect(() => {
        setEdges((edge) => {
            return edge.map((e) => {
                if (e.id === state.currEdgeId) {

                    const label = state.currEdgeLabel;
                    const animated = state.currEdgeIsAnimated;
                    const type = state.currEdgeType;
                    const typeMarker = getEdgeTypeMarker(state.currEdgeMarker);
                    const style = {
                        ...e.style,
                        strokeWidth: state.currEdgeSize,
                        stroke: state.currEdgeColor,
                    };

                    const getMarker = getMarkerStartAndEnd(typeMarker, state.currEdgeColor, state.currEdgeMarker);

                    return {
                        ...e,
                        label: label,
                        style: style,
                        animated: animated,
                        type: type,
                        markerEnd: getMarker.markerEnd,
                        markerStart: getMarker.markerStart,
                    }
                };

                return e;
            });
        });
    }, [state.currEdgeLabel, state.currEdgeColor, state.currEdgeIsAnimated, state.currEdgeSize, state.currEdgeType, state.currEdgeMarker, setEdges]);    

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

        const fontWeight = getFontWeigth(node?.style?.fontWeight, 'label');

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
            currNodeBg: node?.style[`${node?.type}Bg`] || '#eee',
            currNodeBorderStyle: node?.style?.borderStyle || 'solid',
            currNodeTitleColor: node?.style?.color || '#000',
            currNodeFontSize: fontSize || 8,
            currNodeFontWeight: fontWeight || 'Normal',
            currNodeBorderColor: node?.style?.borderColor || '#000',
            currNodeType: node?.type,
            toolbarTab: 0,
        }));
    };

    // handle change curr node title
    const handleChangeText = (e, textType) => {

        const value = {
            'title': 'currNodeTitle',
            'edges-label': 'currEdgeLabel',
        }[textType];

        setState(prev => ({...prev, [value]: e?.target?.value}));
    };

    // handle change curr node color (bg, border, ...)
    const handleChangeColor = (color, type) => {
        const typeChange = getColorPickerState(type);
        setState(prev => ({...prev, [typeChange]: color}));
    };

    // handle change curr node font size
    const handleChangeInputPicker = (value, type) => {
        const typeChange = getInputPickerState(type);
        setState(prev => ({...prev, [typeChange]: value}));
    };

    const handleShowToolBar = () => {
        setState(prev => ({...prev, isShowToolBar: !prev.isShowToolBar}));
    };

    const onEdgeClick = (event, edge) => {
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

        const animated = edge.animated === undefined ? false : edge.animated;
        let marker = getDefaultMarker(edge);

        setState(prev => ({
            ...prev,
            currEdgeId: edge.id,
            currEdgeLabel: edge.label || '',
            currEdgeColor: edge.style?.stroke || '#333',
            currEdgeIsAnimated: animated,
            currEdgeType: edge.type || 'default',
            currEdgeSize: edge.style?.strokeWidth || 1,
            currEdgeMarker: marker,
            isShowToolBar: true,
            toolbarTab: 1,
        }));
    };

    const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
        setEdges((els) => updateEdge(oldEdge, newConnection, els));
    },[]);

    const onLoad = (_reactFlowInstance) => {
        // setReactFlowInstance(_reactFlowInstance);
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
        if (state.isDisplayPopUpPage) {
            setState(prev => ({...prev, isDisplayPopUpPage: false}));
            return;
        };

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

    const handleChangeCheckbox = (event) => {
        setState(prev => ({...prev, currEdgeIsAnimated: event?.target?.checked}));
    };

    const handleChangeTab = (tab) => {
        setState(prev => ({...prev, toolbarTab: tab}));
    };

    const handleUndo = () => {
        const step = flowState?.step - 1;
        const nodesUndo = step !== 0 ? flowState?.flow?.nodes[step] : [];
        const edgesUndo = step !== 0 ? flowState?.flow?.edges[step] : [];
        let element = document.getElementById('icon-back');
        let nextElemnt = document.getElementById('icon-next');

        if (step > 0) {
            nextElemnt.style.opacity = '1';
            element.style.opacity = '1';
        } else {
            element.style.opacity = '0.5';
            if (step < 0) return;
        };

        if (nodesUndo && edgesUndo) {
            setNodes(nodesUndo);
            setEdges(edgesUndo)
            dispatch(updateStep(step));
            state.isUndo = true;
            setState(prev => ({...prev, isUndo: true}));
        };
    };

    const handleRedo = () => {
        const maxStep = flowState?.flow?.nodes?.length - 1;
        const step = flowState?.step + 1;
        let element = document.getElementById('icon-next');
        let backElemnt = document.getElementById('icon-back');

        if (step < maxStep) {
            backElemnt.style.opacity = '1';
            element.style.opacity = '1';
        } else {
            element.style.opacity = '0.5';
            if (step > maxStep) return;
        };

        const nodesRedo = flowState?.flow?.nodes[step];
        const edgesRedo = flowState?.flow?.edges[step];
        if (nodesRedo && edgesRedo) {
            setNodes(nodesRedo);
            setEdges(edgesRedo);
            dispatch(updateStep(step));
            state.isRedo = true;
            setState(prev => ({...prev, isRedo: true}));
        };
    };

    useEffect(() => {
        if (state.isUndo || state.isRedo) {
            state.isUndo = false;
            state.isRedo = false;
            setState(prev => ({...prev, isUndo: false, isRedo: false}));
            return;
        };

        if ((nodes || edges) && !state.isUndo) {
            let element = document.getElementById('icon-back');
            const old = flowState?.flow?.nodes[flowState?.flow?.nodes?.length - 1];
            const oldEdge = flowState?.flow?.edges[flowState?.flow?.edges?.length - 1];
            const step = flowState?.flow?.nodes?.length;
            const compare = JSON.stringify(old) === JSON.stringify(nodes);
            const compareEdge = JSON.stringify(oldEdge) === JSON.stringify(edges);
            if (!compare || !compareEdge) {
                dispatch(updateNodes(nodes));
                dispatch(updateEdges(edges));
                dispatch(updateStep(step))
                if (nodes.length > 0) element.style.opacity = '1';
            }
        };
    },[nodes.length, state.currNodeTitle, edges]);

    const onNodeDragStop = (event, node) => {
        if (node) {
            const updatedNodes = nodes.map(nds => {
                if (nds.id === node.id) {
                    return {
                        ...nds,
                        position: {
                            x: node.position.x,
                            y: node.position.y
                        }
                    };
                } else {
                    return nds;
                }
            });
            dispatch(updateNodes(updatedNodes));
            dispatch(updateEdges(edges));
            dispatch(updateStep(flowState?.flow?.nodes?.length));
        };
    };

    const handleDisplayPopUpPage = (location) => {
        const status = state.isDisplayPopUpPage ? false: true;
        setState(prev => ({...prev, isDisplayPopUpPage: status}));
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
                    onPaneClick={onPaneClick}
                    onNodeDragStop={onNodeDragStop}
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
                        currEdgeId={state.currEdgeId}
                        currEdgeLabel={state.currEdgeLabel}
                        currEdgeColor={state.currEdgeColor}
                        currEdgeSize={state.currEdgeSize}
                        currEdgeMarker={state.currEdgeMarker}
                        currEdgeType={state.currEdgeType}
                        currEdgeIsAnimated={state.currEdgeIsAnimated}
                        toolbarTab={state.toolbarTab}
                        handleChangeText={handleChangeText}
                        handleChangeColor={handleChangeColor}
                        handleShowToolBar={handleShowToolBar}
                        handleChangeInputPicker={handleChangeInputPicker}
                        handleChangeCheckbox={handleChangeCheckbox}
                        handleChangeTab={handleChangeTab}
                    />
                </ReactFlow>
            </div>
            <Shape
                isDisplayPopUpPage={state.isDisplayPopUpPage}
                handleUndo={handleUndo}
                handleRedo={handleRedo}
                handleDisplayPopUpPage={handleDisplayPopUpPage}
            />
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
