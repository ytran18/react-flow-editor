import React from 'react';
import { Handle } from 'reactflow';

const ArrowRectangleNode = ({ data }) => {
    const nodeStyles = {
        border: '1px solid black',
        borderRadius: '4px',
        padding: '8px',
        position: 'relative',
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
      };
    
      const triangleStyles = {
        width: 0,
        height: 0,
        borderTop: '60px solid transparent',
        borderBottom: '60px solid transparent',
        borderRight: '60px solid black',
      };
    
      const handleStyles = {
        position: 'absolute',
        background: '#999',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
      };
    
      return (
        <div style={nodeStyles}>
          <div style={triangleStyles}></div>
          <div>{data.label}</div>
          <Handle
            type="target"
            position="top"
            style={{ ...handleStyles, top: '-4px', left: '50%' }}
          />
          <Handle
            type="source"
            position="bottom"
            style={{ ...handleStyles, bottom: '-4px', left: '50%' }}
          />
        </div>
      );
};

export default ArrowRectangleNode;