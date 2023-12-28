import React, { useState, useEffect } from "react";

import { Handle, Position, useStore } from 'reactflow';

const Cylinder = ({ data, isConnectable }) => {
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
                    <path d="M0,12  L 0,84 A 48 12 0 1 0 96 84 L 96,12 A 48 12 0 1 1 0 12 A 48 12 0 1 1 96 12 A 48 12 0 1 1 0 12 z" fill={state.styles?.cylinderBg || '#eee'} strokeDasharray={strokeDasharray} strokeWidth="1" stroke={stroke} fillOpacity="0.8"></path>
                </g>
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">{data.label}</div>
            <Handle
                type="target"
                position="top"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="cylinder-top"
                style={{ background: '#555', borderRadius: '50%', top: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
                />
            <Handle
                type="source"
                position="bottom"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="cylinder-bottom"
                style={{ background: '#555', borderRadius: '50%', bottom: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
                />
            <Handle
                type="source"
                position={Position.Left}
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="cylinder-left"
                style={{background: '#555', top: '50%', left: -1}}
                isConnectable={isConnectable}
                />
            <Handle
                type="source"
                position={Position.Right}
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="cylinder-right"
                style={{background: '#555', top: '50%', right: -1}}
                isConnectable={isConnectable}
            />
        </>
    );
}

export default Cylinder;