import React from "react";

import { Panel } from 'reactflow';

import PopUpPage from "./PopUpPage";

import { circle, roundedRetangle,retangle, hexagon, arrowRetangle, diamond, cylinder, triangle, parallelogram, plus } from '../../assets/icons';

import IconNext from '../../assets/next.svg';
import IconBack from '../../assets/back.svg';
import IconDelete from '../../assets/delete.svg';
import IconCopy from '../../assets/copy.svg';
import IconSave from '../../assets/save.svg';
import IconDown from '../../assets/arrowdown.svg';

const Shape = (props) => {

    const { handleUndo, handleRedo, isDisplayPopUpPage, handleDisplayPopUpPage } = props;

    const onDragStart = (event, nodeType) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const shape = [
        {type: 'circle', icon: circle, id: 'circle'},
        {type: 'rounded-rectangle', icon: roundedRetangle, id: 'rounded-rectangle'},
        {type: 'rectangle', icon: retangle, id: 'rectangle'},
        {type: 'hexagon', icon: hexagon, id: 'hexagon'},
        {type: 'diamond', icon: diamond, id: 'diamond'},
        {type: 'arrow-rectangle', icon: arrowRetangle, id: 'arrow-rectangle'},
        {type: 'triangle', icon: triangle, id: 'triangle'},
        {type: 'cylinder', icon: cylinder, id: 'cylinder'},
        {type: 'parallelogram', icon: parallelogram, id: 'parallelogram'},
        {type: 'plus', icon: plus, id: 'plus'},
    ];

    const icon = [
        {type: 'back', icon: IconBack, function: handleUndo, id: 'icon-back'},
        {type: 'next', icon: IconNext, function: handleRedo, id: 'icon-next'},
        {type: 'delete', icon: IconDelete, id: 'icon-delete'},
        {type: 'copy', icon: IconCopy, id: 'icon-copy'},
        {type: 'save', icon: IconSave, id: 'icon-save'},
    ];

    return (
        <Panel position="top-left" className="flex">
            <div 
                className="bg-white w-[200px] h-fit rounded-lg shadow-md p-2 mr-2"
            >
                <aside>
                    <div className="text-sm text-center mb-2 select-none">Drag shape to the canvas</div>
                    <div className="w-full grid grid-cols-4">
                        {shape.map((item, index) => {
                            return (
                                <div key={`shape-${index}`} onDragStart={(event) => onDragStart(event, item.id)} draggable>
                                    {item.icon}
                                </div>
                            )
                        })}
                    </div>
                </aside>
            </div>
            <div className="bg-white mr-2 cursor-pointer w-40 py-1 px-4 h-[38px] rounded-lg shadow-md hover:bg-[rgb(241,243,247)] transition-all duration-200 relative select-none">
                <div id="page-panel" className="w-full h-full flex justify-between items-center" onClick={() => handleDisplayPopUpPage('panel')}>
                    <div className="text-xs">Page 1</div>
                    <img src={IconDown}/>
                </div>
                {isDisplayPopUpPage && (
                    <div className="absolute left-0 top-[115%]">
                        <PopUpPage handleDisplayPopUpPage={handleDisplayPopUpPage}/>
                    </div>
                )}
            </div>
            <div className="bg-white p-1 h-[38px] flex items-center rounded-lg shadow-md">
                {icon.map((item, index) => {
                    return (
                        <div key={`icon-${index}`}>
                            <img 
                                src={item.icon}
                                id={item.id}
                                className="mx-1 p-1 hover:bg-[rgb(226,232,240)] rounded-md cursor-pointer"
                                onClick={item?.function}
                                style={{opacity: '0.5'}}
                            />
                        </div>
                    )
                })}
            </div>
        </Panel>
    );
};

export default Shape;