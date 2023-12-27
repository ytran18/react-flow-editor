import React, { useEffect, useState } from "react";

import { useStore } from 'reactflow';

const Hexagon = ({data}) => {

    const store = useStore();

    const [state, setState] = useState({
        styles: {},
    });

    useEffect(() => {
        const node = store.getNodes();
        const styles = node.filter(node => node.id === data.id);

        setState(prev => ({...prev, styles: styles?.[0]?.style || {}}));
    },[store]);

    return (
        <>
            <svg width="120" height="60" className="relative">
                <g transform="translate(2, 2)">
                    <path d="M0,28 L11.600000000000001,0 L104.4,0 L116,28 L104.4,56 L11.600000000000001,56 Z" fill={state.styles?.hexagonBg || '#eee'} strokeWidth="2" strokeDasharray={state.styles?.borderStyle === 'dotted' ? '0.8,1' : '0'} stroke={state.styles?.borderColor} fillOpacity="0.8"></path>
                </g>
            </svg>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">{data.label}</div>
        </>
    );
};

export default Hexagon;