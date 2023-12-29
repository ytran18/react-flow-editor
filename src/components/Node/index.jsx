import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import './node.css';

export default memo(({ data, isConnectable }) => {

    const shapeStyle = {
        'default': 'py-3 px-10 max-w-64 text-center',
        'circle': 'w-20 h-20 flex items-center justify-center',
        'rounded-retangle': 'py-3 px-10 max-w-64 text-center',
        'retangle': 'py-3 px-10 max-w-64 text-center',
        'diamond': 'py-6 px-6 max-w-64 text-center',
    }[data?.shape];

    return (
        <>
            <div 
                className={`${shapeStyle} rounded-lg !text-[${data?.style?.color}]`}
            >
                {data?.label}
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                className={`${data?.isSelected ? 'block' : 'hidden'}`}
                id="source"
                style={{background: '#555', bottom: -3}}
                isConnectable={isConnectable}
            />
            {!data?.isRootNode && (
                <Handle
                    type="target"
                    position={Position.Top}
                    className={`${data?.isSelected ? 'block' : 'hidden'}`}
                    id="target"
                    style={{background: '#555', top: -3}}
                    isConnectable={isConnectable}
                />
            )}
        </>
    );
});
