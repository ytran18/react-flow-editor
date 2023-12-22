import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import './node.css';

export default memo(({ data, isConnectable }) => {
    return (
        <>
            <div 
                className={`!text-[${data?.style?.fontSize}] font-[${data?.style?.fontWeight}] py-3 px-10 max-w-64 text-center rounded-lg !text-[${data?.style?.color}]`}
            >
                {data?.label}
            </div>
            <Handle
                type="source"
                position={Position.Bottom}
                id="a"
                style={{background: '#555', bottom: -3}}
                isConnectable={isConnectable}
            />
            {!data?.isRootNode && (
                <Handle
                    type="target"
                    position={Position.Top}
                    id="a"
                    style={{background: '#555', top: -3}}
                    isConnectable={isConnectable}
                />
            )}
        </>
    );
});
