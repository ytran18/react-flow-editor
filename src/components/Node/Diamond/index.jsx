import React from "react";

import { Handle, Position } from 'reactflow';

const Diamond = ({data, isConnectable}) => {
    return (
        <div className="flex flex-col" style={{ width: 100, height: 100, position: 'relative' }}>
            <svg
                width="100"
                height="100"
                dangerouslySetInnerHTML={{
                __html: `
                    <polygon points="50,0 100,50 50,100 0,50" fill="#fff" stroke="#333" />
                `,
                }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <p>{data.label}</p>
            </div>
            <Handle
                type="target"
                position="top"
                id="diamond-top"
                style={{ background: '#555', borderRadius: '50%' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                position="bottom"
                id="diamond-bottom"
                style={{ background: '#555', borderRadius: '50%' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                position={Position.Left}
                id="diamond-left"
                style={{background: '#555', top: '50%'}}
                isConnectable={isConnectable}
            />
            <Handle
                type="source"
                position={Position.Right}
                id="diamond-right"
                style={{background: '#555', top: '50%'}}
                isConnectable={isConnectable}
            />
    </div>
    );
};

export default Diamond;