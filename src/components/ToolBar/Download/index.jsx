import React from "react";

import { toPng, toSvg } from 'html-to-image';
import { useReactFlow, getNodesBounds, getViewportForBounds } from 'reactflow';

import { DownloadOutlined } from '@ant-design/icons';

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

const filter = (node) => {
    return (node.tagName !== 'i');
}

const imageWidth = 1024;
const imageHeight = 768;

const Download = () => {

    const { getNodes } = useReactFlow();

    const handleDownload = (type) => {
        if (type === 'png') {
            // const nodesBounds = getRectOfNodes(getNodes());
            const nodesBounds = getNodesBounds(getNodes());
            const transform = getViewportForBounds(nodesBounds, imageWidth, imageHeight, 0.5, 2);
        
            toPng(document.querySelector('.react-flow__viewport'), {
                background: 'transparent',
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
        <div className="p-6 w-full overflow-y-auto h-full scrollbar-hide">
            <div className="flex items-center mb-3 w-full">
                <div className="text-sm w-[60%]">Download with <span className="font-bold">PNG</span></div>
                <div className="cursor-pointer w-[40%] flex items-center justify-end">
                    <DownloadOutlined onClick={() => handleDownload('png')}/>
                </div>
            </div>
            <div className="flex items-center mb-3 w-full">
                <div className="text-sm w-[60%]">Download with <span className="font-bold">SVG</span></div>
                <div className="cursor-pointer w-[40%] flex items-center justify-end">
                    <DownloadOutlined onClick={() => handleDownload('svg')}/>
                </div>
            </div>
        </div>
    );
};

export default Download;