import React, { useState } from "react";

import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng, toSvg } from 'html-to-image';

import Style from './Style/index';
import Data from './Data/index';
import Event from './Event/index';

import IconMore from '../../assets/more.svg';
import IconDoubleRight from '../../assets/doubleRight.svg';

const downloadImage = (dataUrl) => {
    const a = document.createElement('a');
  
    a.setAttribute('download', 'reactflow.png');
    a.setAttribute('href', dataUrl);
    a.click();
};

const downloadSvg = (dataUrl) => {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'reactflow.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const imageWidth = 1024;
const imageHeight = 768;

const ToolBar = (props) => {

    const { currNodeTitle, handleChangeText, currNodeBg, handleChangeColor, currNodeBorderColor,
            handleShowToolBar, isShowToolBar, currNodeFontSize, handleChangeInputPicker, currNodeTitleColor,
            currNodeId, currNodeFontWeight, currNodeBorderStyle } = props;

    const { getNodes } = useReactFlow();

    const [state, setState] = useState({
        tab: 0,
    });

    const tabTitle = ['Style', 'Data', 'Event'];

    function filter (node) {
        return (node.tagName !== 'i');
    };

    const onClick = (type) => {
        if (type === 'png') {
            const nodesBounds = getRectOfNodes(getNodes());
            const transform = getTransformForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);
        
            toPng(document.querySelector('.react-flow__viewport'), {
                backgroundColor: '#1a365d',
                width: imageWidth,
                height: imageHeight,
                style: {
                    width: imageWidth,
                    height: imageHeight,
                    transform: `translate(${transform[0]}px, ${transform[1]}px) scale(${transform[2]})`,
                },
            }).then(downloadImage);
        };

        if (type === 'svg') {
            toSvg(document.querySelector('.react-flow__viewport'), {filter: filter})
                .then(downloadSvg);
        };
    };

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
            />,
        1: <Data />,
        2: <Event />
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
                        className="cursor-pointer transform scale-75"
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
                {/* <div className="border-r border-[rgb(212,212,212)] p-2 flex items-center justify-center">
                    <img 
                        src={IconImage} 
                        className='cursor-pointer select-none'
                        onClick={() => onClick('png')}
                    />
                </div>
                <div className="p-2 flex items-center justify-center">
                    <img 
                        src={IconSvg} 
                        className='cursor-pointer w-[24px] select-none'
                        onClick={() => onClick('svg')}
                    />
                </div> */}
            </div>
            <div className={`${isShowToolBar ? 'hidden' : 'block'}`}>
                <img 
                    src={IconMore}
                    className="cursor-pointer"
                    onClick={handleShowToolBar}
                />
            </div>
        </Panel>
    );
};

export default ToolBar;