import React, { useCallback } from "react";
import { Panel, useReactFlow } from 'reactflow';

import { PlusOutlined, MinusOutlined, ExpandOutlined } from '@ant-design/icons';

const Controls = () => {

    const { zoomIn, zoomOut, setCenter } = useReactFlow();

    const handleTransform = useCallback(() => {
        const newTransform = {
            x: 0,
            y: 50,
            zoom: 1,
        };

        setCenter(newTransform.x, newTransform.y, {
            zoom: newTransform.zoom,
            duration: 200,
        });
    }, [setCenter]);

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
};

export default Controls;