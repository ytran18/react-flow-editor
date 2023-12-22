import React from "react";

import { Panel } from 'reactflow';

import { circle, roundedRetangle,retangle, hexagon, arrowRetangle, diamond, cylinder, triangle, parallelogram, plus } from '../../assets/icons';

const Shape = () => {
    return (
        <Panel 
            position="top-left"
            className="bg-white w-[200px] h-fit rounded-lg shadow-md p-2"
        >
            <div className="text-sm text-center mb-2 select-none">Drag shape to the canvas</div>
            <div className="w-full grid grid-cols-4">
                {circle}
                {roundedRetangle}
                {retangle}
                {hexagon}
                {diamond}
                {arrowRetangle}
                {cylinder}
                {triangle}
                {parallelogram}
                {plus}
            </div>
        </Panel>
    );
};

export default Shape;