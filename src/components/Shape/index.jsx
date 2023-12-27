import React from "react";

import { Panel } from 'reactflow';

import { circle, roundedRetangle,retangle, hexagon, arrowRetangle, diamond, cylinder, triangle, parallelogram, plus } from '../../assets/icons';

const Shape = () => {

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Panel 
            position="top-left"
            className="bg-white w-[200px] h-fit rounded-lg shadow-md p-2"
        >
            <aside>
                <div className="text-sm text-center mb-2 select-none">Drag shape to the canvas</div>
                <div className="w-full grid grid-cols-4">
                    <div onDragStart={(event) => onDragStart(event, 'circle')} draggable>
                        {circle}
                    </div>
                    <div onDragStart={(event) => onDragStart(event, 'rounded-retangle')} draggable>
                        {roundedRetangle}
                    </div>
                    <div onDragStart={(event) => onDragStart(event, 'retangle')} draggable>
                        {retangle}
                    </div>
                    <div onDragStart={(event) => onDragStart(event, 'hexagon')} draggable>
                        {hexagon}
                    </div>
                    <div onDragStart={(event) => onDragStart(event, 'diamond')} draggable>
                        {diamond}
                    </div>
                    <div onDragStart={(event) => onDragStart(event, 'arrow-retangle')} draggable>
                        {arrowRetangle}
                    </div>
                    {cylinder}
                    {triangle}
                    {parallelogram}
                    {plus}
                </div>
            </aside>
        </Panel>
    );
};

export default Shape;