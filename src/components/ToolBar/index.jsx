import React from "react";

import { Panel, useReactFlow, getRectOfNodes, getTransformForBounds } from 'reactflow';
import { toPng, toSvg } from 'html-to-image';

import IconImage from '../../assets/image.svg';
import IconSvg from '../../assets/svg.svg';

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

const ToolBar = () => {

    const { getNodes } = useReactFlow();

    function filter (node) {
        return (node.tagName !== 'i');
    }

    const onClick = (type) => {
        // we calculate a transform for the nodes so that all nodes are visible
        // we then overwrite the transform of the `.react-flow__viewport` element
        // with the style option of the html-to-image library
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

    return (
        <Panel position="top-right" className="flex items-center border border-[rgb(212,212,212)]">
            <div className=" border-r border-[rgb(212,212,212)] p-2 flex items-center justify-center">
                <img 
                    src={IconImage} 
                    className='cursor-pointer'
                    onClick={() => onClick('png')}
                />
            </div>
            <div className="p-2 flex items-center justify-center">
                <img 
                    src={IconSvg} 
                    className='cursor-pointer w-[24px]'
                    onClick={() => onClick('svg')}
                />
            </div>
    </Panel>
    );
};

export default ToolBar;