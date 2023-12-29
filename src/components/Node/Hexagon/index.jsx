import React, { useEffect, useState } from "react";

import { useStore, Handle, Position } from 'reactflow';

const Hexagon = ({data, isConnectable}) => {

    const store = useStore();

    const [state, setState] = useState({
        styles: {},
    });

    useEffect(() => {
        const node = store.getNodes();
        const styles = node.filter(node => node.id === data.id);

        setState(prev => ({...prev, styles: styles?.[0]?.style || {}}));
    },[store]);

    const stroke = (state.styles?.borderStyle !== 'none' && state.styles?.borderStyle !== 'hidden') ? state.styles?.borderColor : 'none';

    const strokeDasharray = {
        'dotted': '2, 1',
        'dashed': '5 2',
    }[state.styles?.borderStyle];

    return (
        <>
            <svg width="120" height="60" className="relative">
                <g transform="translate(2, 2)">
                    <path d="M0,28 L11.600000000000001,0 L104.4,0 L116,28 L104.4,56 L11.600000000000001,56 Z" fill={state.styles?.hexagonBg || '#eee'} strokeWidth="1" strokeDasharray={strokeDasharray} stroke={stroke} fillOpacity="0.8"></path>
                </g>
            </svg>
            <div className="absolute left-1/2 top-1/2 text-center -translate-x-1/2 -translate-y-1/2 transform">{data.label}</div>
            <Handle
                type="target"
                position="top"
                id="hexagon-top"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                style={{ background: '#555', borderRadius: '50%', top: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
                />
            <Handle
                type="source"
                position="bottom"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="hexagon-bottom"
                style={{ background: '#555', borderRadius: '50%', bottom: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
                />
            <Handle
                type="source"
                position={Position.Left}
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="hexagon-left"
                style={{background: '#555', top: '50%', left: -1}}
                isConnectable={isConnectable}
                />
            <Handle
                type="source"
                position={Position.Right}
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="hexagon-right"
                style={{background: '#555', top: '50%', right: -1}}
                isConnectable={isConnectable}
            />
        </>
    );
};

export default Hexagon;