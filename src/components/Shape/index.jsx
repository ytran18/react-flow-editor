import React from "react";

import { Panel, useStore } from 'reactflow';

import { circle, roundedRetangle,retangle, hexagon, arrowRetangle, diamond, cylinder, triangle, parallelogram, plus } from '../../assets/icons';

import IconNext from '../../assets/next.svg';
import IconBack from '../../assets/back.svg';

const Shape = (props) => {

    const { handleUndo, handleRedo } = props;

    const store = useStore();

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <Panel position="top-left" className="flex">
            <div 
                className="bg-white w-[200px] h-fit rounded-lg shadow-md p-2 mr-2"
            >
                <aside>
                    <div className="text-sm text-center mb-2 select-none">Drag shape to the canvas</div>
                    <div className="w-full grid grid-cols-4">
                        <div onDragStart={(event) => onDragStart(event, 'circle')} draggable>
                            {circle}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'rounded-rectangle')} draggable>
                            {roundedRetangle}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'rectangle')} draggable>
                            {retangle}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'hexagon')} draggable>
                            {hexagon}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'diamond')} draggable>
                            {diamond}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'arrow-rectangle')} draggable>
                            {arrowRetangle}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'triangle')} draggable>
                            {triangle}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'cylinder')} draggable>
                            {cylinder}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'parallelogram')} draggable>
                            {parallelogram}
                        </div>
                        <div onDragStart={(event) => onDragStart(event, 'plus')} draggable>
                            {plus}
                        </div>
                    </div>
                </aside>
            </div>
            <div className="bg-white p-1 h-fit flex items-center rounded-lg shadow-md">
                <img
                    src={IconBack}
                    id="icon-back"
                    className="mx-1 p-1 hover:bg-[rgb(226,232,240)] rounded-md cursor-pointer"
                    onClick={handleUndo}
                    style={{opacity: '0.5'}}
                    />
                <img
                    src={IconNext}
                    id="icon-next"
                    className="mx-1 p-1 hover:bg-[rgb(226,232,240)] rounded-md cursor-pointer"
                    onClick={handleRedo}
                    style={{opacity: '0.5'}}
                />
            </div>
        </Panel>
    );
};

export default Shape;