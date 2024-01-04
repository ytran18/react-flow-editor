import React, { useState } from "react";
import { Panel, useReactFlow, MiniMap } from 'reactflow';

import { PlusOutlined, MinusOutlined, ExpandOutlined, DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';

import './control.css';

const Controls = (props) => {

    const { handleTransform } = props;

    const [state, setState] = useState({
        isShowMinimap: true,
    });

    const { zoomIn, zoomOut } = useReactFlow();

    return (
        <Panel position="bottom-left" className="flex items-center justify-between controls">
            <div className="flex flex-col border border-[rgb(214,220,227)] shadow-md">
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
                {state.isShowMinimap ? (
                    <DoubleLeftOutlined 
                        className="cursor-pointer p-2 hover:bg-white"
                        onClick={() => setState(prev => ({...prev, isShowMinimap: !state.isShowMinimap}))}
                    />
                ) : (
                    <DoubleRightOutlined 
                        className="cursor-pointer p-2 hover:bg-white"
                        onClick={() => setState(prev => ({...prev, isShowMinimap: !state.isShowMinimap}))}
                    />
                )}
            </div>
            {state.isShowMinimap && (
                <div className="w-[205px] h-[130px]">
                    <MiniMap />
                </div>
            )}
        </Panel>
    );
};

export default Controls;