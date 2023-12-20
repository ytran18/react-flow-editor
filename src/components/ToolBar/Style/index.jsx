import React, { useState, useRef, useEffect } from "react";

import { SketchPicker } from 'react-color';

const Style = () => {

    const [state, setState] = useState({
        currColor: '#000',
        currBackground: '#000',
        currBorderColor: '#000',
        currShadowColor: '#000',
        isDisplayColorPickerColor: false,
        isDisplayColorPickerBackground: false,
        isDisplayColorPickerBorderColor: false,
        isDisplayColorPickerShadowColor: false,
    });

    const colorPickerRef = useRef(null);

    const title = [
        { label: 'ID', type: 'text' },
        { label: 'Title', type: 'text' },
        { label: 'Color', type: 'color', state: 'isDisplayColorPickerColor', curr: 'currColor' },
        { label: 'Font', type: 'picker' },
        { label: 'Font Size', type: 'picker' },
        { label: 'Font Style', type: 'picker' },
        { label: 'Background', type: 'color', state: 'isDisplayColorPickerBackground', curr: 'currBackground' },
        { label: 'Opacity', type: 'text-number' },
        { label: 'Width', type: 'text-number' },
        { label: 'Height', type: 'text-number' },
        { label: 'Padding', type: 'text-number' },
        { label: 'Border Color', type: 'color', state: 'isDisplayColorPickerBorderColor', curr: 'currBorderColor' },
        { label: 'Border Size', type: 'text-number' },
        { label: 'Border Style', type: 'picker' },
        { label: 'Shadow Color', type: 'color', state: 'isDisplayColorPickerShadowColor', curr: 'currShadowColor' },
        { label: 'Shadow Offset', type: 'text-number' },
        { label: 'Shadow Spread', type: 'text-number' },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
                setState(prev => ({
                    ...prev,
                    isDisplayColorPickerColor: false,
                    isDisplayColorPickerBackground: false,
                    isDisplayColorPickerBorderColor: false,
                    isDisplayColorPickerShadowColor: false,
                }));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDisplayColorPicker = (stateName) => {
        let stateArr = ['isDisplayColorPickerColor', 'isDisplayColorPickerBackground', 'isDisplayColorPickerBorderColor', 'isDisplayColorPickerShadowColor'];

        let filterArr = stateArr.filter(ele => ele !== stateName);
        
        const state1 = filterArr[0];
        const state2 = filterArr[1];
        const state3 = filterArr[2];

        setState(prev => ({
            ...prev,
            [stateName]: !prev[stateName],
            [state1]: false,
            [state2]: false,
            [state3]: false
        }));
    };

    const handleChangeComplete = (color, stateName, isOnChange) => {
        if (isOnChange) {
            setState(prev => ({...prev, [stateName]: color}));
        } else {
            setState(prev => ({...prev, [stateName]: color.hex}));
        }
    };

    return (
        <div className="p-2 w-full overflow-y-auto h-full scrollbar-hide">
            {title.map((item, index) => {
                return (
                    <div key={`title-style-${index}`}>
                        {item.type === 'text' && (
                            <div className="w-full p-2 flex items-center">
                                <div className="w-[30%] text-xs mr-2 text-right">{item.label}</div>
                                <div className="w-[70%] border border-[rgb(219,219,219)]">
                                    <input 
                                        className="w-full h-full outline-none text-xs py-1 px-2"
                                    />
                                </div>
                            </div>
                        )}


                        {item.type === 'color' && (
                            <div className="w-full p-2 flex items-center">
                                <div className="w-[30%] text-xs mr-2 text-right">{item.label}</div>
                                <div className="w-[70%] relative border border-[rgb(219,219,219)]">
                                    <input
                                        value={state[item.curr]}
                                        onChange={(e) => handleChangeComplete(e.target.value, item.curr, true)}
                                        className="w-full h-full outline-none text-xs py-1 px-2"
                                    />
                                    <div
                                        onClick={() => handleDisplayColorPicker(item.state)}
                                        style={{background: state[item.curr]}}
                                        className={`w-4 h-4 cursor-pointer absolute right-1 top-1/2 transform -translate-y-1/2`}
                                    ></div>
                                    {state[item.state] && (
                                        <div
                                            ref={colorPickerRef}
                                            className="absolute top-[110%] right-0 z-10"
                                        >
                                            <SketchPicker 
                                                color={state[item.curr]}
                                                onChangeComplete={(color) => handleChangeComplete(color, item.curr)}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export default Style;