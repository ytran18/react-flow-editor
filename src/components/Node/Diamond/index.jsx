import React, { useEffect, useState } from "react";

import { Handle, Position, useStore } from 'reactflow';

const Diamond = ({data, isConnectable}) => {

    const [state, setState] = useState({
        styles: {},
    });

    const store = useStore();

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
        <div className="flex flex-col" style={{ width: 100, height: 100, position: 'relative' }}>

            <svg width="100" height="100">
                <g transform="translate(2, 2)">
                    <path d="M0,48 L48,0 L96,48 L48,96 Z" fill={state.styles?.diamondBg || '#eee'} strokeWidth="1" stroke={stroke} strokeDasharray={strokeDasharray} fillOpacity="0.8"></path>
                </g>
            </svg>

            <div className="absolute top-1/2 left-1/2 text-center transform -translate-y-1/2 -translate-x-1/2">
                <p>{data.label}</p>
            </div>
            <Handle
                type="target"
                position="top"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="diamond-top"
                style={{ background: '#555', borderRadius: '50%', top: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
                />
            <Handle
                type="source"
                position="bottom"
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="diamond-bottom"
                style={{ background: '#555', borderRadius: '50%', bottom: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
                />
            <Handle
                type="source"
                position={Position.Left}
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="diamond-left"
                style={{background: '#555', top: '50%', left: -1}}
                isConnectable={isConnectable}
                />
            <Handle
                type="source"
                position={Position.Right}
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="diamond-right"
                style={{background: '#555', top: '50%', right: -1}}
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default Diamond;