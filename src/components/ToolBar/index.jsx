import React, { useState } from "react";

import { Panel } from 'reactflow';

import Style from './Style/index';
import Edges from './Edges/index';
import Download from './Download/index';

import IconMore from '../../assets/more.svg';
import IconDoubleRight from '../../assets/doubleRight.svg';

const ToolBar = (props) => {

    const { currNodeTitle, handleChangeText, currNodeBg, handleChangeColor, currNodeBorderColor,
            handleShowToolBar, isShowToolBar, currNodeFontSize, handleChangeInputPicker, currNodeTitleColor,
            currNodeId, currNodeFontWeight, currNodeBorderStyle, currNodeType } = props;

    const [state, setState] = useState({
        tab: 0,
    });

    const tabTitle = ['Node', 'Edges', 'Download'];

    const handleChangeTab = (tab) => {
        setState(prev => ({...prev, tab: tab}));
    };

    const renderTab = {
        0: <Style 
                currNodeTitle={currNodeTitle}
                currNodeBg={currNodeBg}
                currNodeBorderColor={currNodeBorderColor}
                currNodeFontSize={currNodeFontSize}
                currNodeTitleColor={currNodeTitleColor}
                currNodeId={currNodeId}
                currNodeFontWeight={currNodeFontWeight}
                currNodeBorderStyle={currNodeBorderStyle}
                handleChangeText={handleChangeText}
                handleChangeColor={handleChangeColor}
                handleChangeInputPicker={handleChangeInputPicker}
                currNodeType={currNodeType}
            />,
        1: <Edges />,
        2: <Download />
    }[state.tab] || 0;

    return (
        <Panel
            position="right"
            className={`flex items-center ${isShowToolBar ? 'border border-[rgb(212,212,212)] bg-white' : ''}`}
            style={{height: isShowToolBar ? 'calc(100vh - 30px)' : ''}}
        >
            <div className={`${isShowToolBar ? 'block' : 'hidden'} w-72 h-full overflow-hidden transition-all duration-300`}>
                <div className="relative p-2 h-9 mb-4 flex w-full items-center">
                    <img
                        src={IconDoubleRight}
                        className="cursor-pointer select-none transform scale-75"
                        onClick={handleShowToolBar}
                    />
                    <div className="text-sm text-center w-full">Property Inspector</div>
                </div>
                <div className="w-full grid grid-cols-3 text-sm mb-2">
                    {tabTitle.map((item, index) => {
                        return (
                            <div
                                onClick={() => handleChangeTab(index)}
                                key={`toolbar-tab-${index}`}
                                className={`flex items-center ${state.tab === index ? 'text-[#3498db]' : 'text-black'} transition-all duration-200 justify-center cursor-default font-medium hover:text-[#3498db]`}
                            >
                                {item}
                            </div>
                        )
                    })}
                </div>
                <div className="w-full" style={{height: 'calc(100% - 80px)'}}>
                    {renderTab}
                </div>
            </div>
            <div className={`${isShowToolBar ? 'hidden' : 'block'}`}>
                <img 
                    src={IconMore}
                    className="cursor-pointer select-none"
                    onClick={handleShowToolBar}
                />
            </div>
        </Panel>
    );
};

export default ToolBar;