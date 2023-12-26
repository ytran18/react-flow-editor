import React, { useCallback } from "react";
import { Panel, useReactFlow } from 'reactflow';

import { PlusOutlined, MinusOutlined, ExpandOutlined } from '@ant-design/icons';

const Controls = React.forwardRef((props, ref) => {

    const { zoomIn, zoomOut, setCenter } = useReactFlow();

    const handleTransform = () => {
        if (ref && ref.current) {
            ref.current.fitView();
            // const windowWidth = window.innerWidth;
            // const windowHeight = window.innerHeight;

            
            // const scaleX = windowWidth / ref.current.offsetWidth;
            // const scaleY = windowHeight / ref.current.offsetHeight;
            
            // console.log(windowWidth / ref.current.offsetWidth);
            // const scale = Math.min(scaleX, scaleY);
    
            // const x = windowWidth / 2 - (ref.current.offsetWidth * scale) / 2;
            // const y = windowHeight / 2 - (ref.current.offsetHeight * scale) / 2;
    
            // setCenter(x, y, {
            //     zoom: scale,
            //     duration: 200,
            // });
        }
    };

    return (
        <Panel position="bottom-left" className="flex flex-col border border-[rgb(214,220,227)] shadow-md">
            <PlusOutlined
                className="cursor-pointer p-2 hover:bg-white"
                onClick={() => zoomIn({ duration: 200 })}
            />
            <MinusOutlined
                className="cursor-pointer p-2 border-b border-t border-white hover:bg-white"
                onClick={() => zoomOut({ duration: 200 })}
            />
            <ExpandOutlined
                className="cursor-pointer p-2 hover:bg-white"
                onClick={handleTransform}
            />
        </Panel>
    );
});

export default Controls;