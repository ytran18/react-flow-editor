import React, { useState, useEffect } from "react";

import { Handle, Position, useStore } from 'reactflow';

const Plus = ({ data, isConnectable }) => {
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
            <svg width="100" height="100">
                <g transform="translate(2, 2)">
                    <path d="M32,0 L64,0 L64,32 L96,32 L96,64 L96,64 L64,64 L64,96 L64,96 L32,96 L32,64 L0,64 L0,32 L32,32 Z" fill={state.styles?.plusBg || '#eee'} strokeWidth="1" strokeDasharray={strokeDasharray} stroke={stroke} fillOpacity="0.8"></path>
                </g>
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">{data.label}</div>
            <Handle
                type="target"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                position="top"
                id="plus-top"
                style={{ background: '#555', borderRadius: '50%', top: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                position="bottom"
                id="plus-bottom"
                style={{ background: '#555', borderRadius: '50%', bottom: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                position={Position.Left}
                id="plus-left"
                style={{background: '#555', top: '50%', left: -1}}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                position={Position.Right}
                id="plus-right"
                style={{background: '#555', top: '50%', right: -1}}
                isConnectable={isConnectable}
            />
        </>
    );
}

export default Plus;