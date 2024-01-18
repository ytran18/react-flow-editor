import React, { useEffect, useRef, useState } from "react";

import IconPen from '../../../assets/pencil.svg';
import IconPLus from '../../../assets/plus.svg';
import IconCheck from '../../../assets/check.svg';
import IconDrag from '../../../assets/drag.svg';
import IconMore from '../../../assets/more90.svg';

const PopUpPage = (props) => {

    const { handleDisplayPopUpPage } = props;

    const [state, setState] = useState({
        isEditPage: false,
        inpList: [
            { id: 1, name: 'Page 1' },
            { id: 2, name: 'Page 2' },
            { id: 3, name: 'Page 3' },
            { id: 4, name: 'Page 4' },
            { id: 5, name: 'Page 5' },
            { id: 6, name: 'Page 6' },
            { id: 7, name: 'Page 7' },
            { id: 8, name: 'Page 8' },
            { id: 9, name: 'Page 9' },
            { id: 10, name: 'Page 10' },
        ],
    });

    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                let id = event.target.id;
                if (id !== 'page-panel') {
                    handleDisplayPopUpPage('popup');
                };
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    const handleDoubleClick = (id) => {
        const inpId = `inp-${id}`;
        const inp = document.getElementById(inpId);

        if (inp) {
            inp.disabled = false;
            inp.focus();
            setState(prev => ({...prev, isEditPage: true}));
        };
    };

    const handleOnChange = (event, id, index) => {
        const newList = [...state.inpList];
        newList[index].name = event?.target?.value;

        setState(prev => ({...prev, inpList: newList}));
    };

    const iconEdit = {
        true: IconCheck,
        false: IconPen,
    }[state.isEditPage];

    return (
        <div ref={popupRef} className="w-[220px] z-50 cursor-default max-h-[395px] bg-white shadow-lg rounded-md flex flex-col">
            <div className="p-2 flex items-center justify-between border-b border-[rgb(58,58,70)]">
                <div className="text-sm">Pages</div>
                <div className="flex items-center gap-2">
                    <div
                        onClick={() => setState(prev => ({...prev, isEditPage: !prev.isEditPage}))}
                        className="p-1 cursor-pointer hover:bg-[rgb(219,219,219)] rounded-md transition-all duration-200"
                    >
                        <img src={iconEdit} className="w-[20px] h-[20px]"/>
                    </div>
                    <div className="p-1 cursor-pointer hover:bg-[rgb(219,219,219)] rounded-md transition-all duration-200">
                        <img src={IconPLus}/>
                    </div>
                </div>
            </div>
            <div className="p-2 flex flex-col scrollbar-hide" style={{height: 'calc(100% - 40px)', overflowY: 'auto'}}>
                {state.inpList.map((item, index) => {
                    return (
                        <div className="text-sm flex items-center justify-between font-medium p-2 hover:bg-[rgb(239,239,239)] rounded-md cursor-pointer" key={`page-item-${index}`}>
                            <div
                                onDoubleClick={() => handleDoubleClick(item.id)} 
                                className="flex items-center gap-4"
                            >
                                {state.isEditPage && (
                                    <img src={IconDrag} className="w-[18px] h-[18px]"/>
                                )}
                                <input
                                    id={`inp-${item.id}`}
                                    className="bg-transparent max-w-[120px] outline-none select-none"
                                    disabled={!state.isEditPage}
                                    value={item.name}
                                    onChange={(e) => handleOnChange(e, item.id, index)}
                                />
                            </div>
                            <div className="hover:bg-[rgb(219,219,219)] p-1 rounded-md">
                                <img src={IconMore}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default PopUpPage;