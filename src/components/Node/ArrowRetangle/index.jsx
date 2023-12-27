import React, { useState, useEffect } from 'react';
import { Handle, useStore, Position } from 'reactflow';

const ArrowRectangleNode = ({ data, isConnectable }) => {

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
        <div className="flex flex-col" style={{ width: 140, height: 60, position: 'relative' }}>

            <svg width="140" height="60">
                <g transform="translate(2, 2)">
                    <path d="M0,0 L122.4,0 L136,28 L122.4,56 L0,56 Z" fill={state.styles?.arrowRectangleBg || '#eee'} strokeWidth="1" stroke={stroke} strokeDasharray={strokeDasharray} fillOpacity="0.8"></path>
                </g>
            </svg>

            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                {data.label}
            </div>
            <Handle
                type="target"
                position="top"
                id="arrwoRectangle-top"
                style={{ background: '#555', borderRadius: '50%', top: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                position="bottom"
                id="arrwoRectangle-bottom"
                style={{ background: '#555', borderRadius: '50%', bottom: -1 }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                position={Position.Left}
                id="arrwoRectangle-left"
                style={{background: '#555', top: '50%', left: -1}}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="arrwoRectangle-right"
                style={{background: '#555', top: '50%', right: -1}}
                isConnectable={isConnectable}
            />
        </div>
    );
};

export default ArrowRectangleNode;