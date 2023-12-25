import React, { useState, useRef, useEffect } from "react";

import { SketchPicker } from 'react-color';

import Picker from "./Picker";

const Style = (props) => {

    const { currNodeTitle, handleChangeText, currNodeBg, handleChangeColor, currNodeBorderColor,
            currNodeFontSize, handleChangeInputPicker, currNodeTitleColor, currNodeId, currNodeFontWeight,
            currNodeBorderStyle } = props;

    const [state, setState] = useState({
        currColor: '',
        currBackground: '',
        currBorderColor: '#000000',
        currShadowColor: '#000000',
        isDisplayColorPickerColor: false,
        isDisplayColorPickerBackground: false,
        isDisplayColorPickerBorderColor: false,
        isDisplayColorPickerShadowColor: false,
    });

    useEffect(() => {
        setState(prev => ({
            ...prev,
            currBackground: currNodeBg,
            currBorderColor: currNodeBorderColor,
            currColor: currNodeTitleColor,
        }));
    },[currNodeBg, currNodeBorderColor, currNodeTitleColor]);

    const colorPickerRef = useRef(null);

    const title = [
        { label: 'ID', type: 'text', textType: 'id' },
        { label: 'Title', type: 'text', textType: 'title' },
        { label: 'Color', type: 'color', state: 'isDisplayColorPickerColor', curr: 'currColor' },
        { label: 'Font', type: 'picker', pickerType: 'font', inputType: 'text', defaultValue: 'Normal' },
        { label: 'Font Size', type: 'picker', pickerType: 'font-size', inputType: 'number', defaultValue: 14 },
        { label: 'Font Weight', type: 'picker', pickerType: 'font-weight', inputType: 'text', defaultValue: 'font weight' },
        { label: 'Background', type: 'color', state: 'isDisplayColorPickerBackground', curr: 'currBackground' },
        { label: 'Border Color', type: 'color', state: 'isDisplayColorPickerBorderColor', curr: 'currBorderColor' },
        { label: 'Border Style', type: 'picker', pickerType: 'border-style', inputType: 'text', defaultValue: 'solid' },
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
        };

        const colorChange = isOnChange ? color : color.hex;

        handleChangeColor(colorChange, stateName);
        handleChangeColor(colorChange, stateName);
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
                                        disabled={item?.textType === 'id'}
                                        value={item?.textType === 'title' ? currNodeTitle : currNodeId}
                                        onChange={(e) => handleChangeText(e, item?.textType)}
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
                                        className={`w-4 h-4 border border-solid border-[#333] cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2`}
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

                        {item.type === 'picker' && (
                            <div className="w-full">
                                <Picker
                                    item={item}
                                    type={item.pickerType}
                                    currNodeFontSize={currNodeFontSize}
                                    currNodeFontWeight={currNodeFontWeight}
                                    currNodeBorderStyle={currNodeBorderStyle}
                                    handleChangeInputPicker={handleChangeInputPicker}
                                />
                            </div>                        
                        )}

                        {item.type === 'text-number' && (
                            <div className="w-full p-2 flex items-center">
                                <div className="w-[30%] text-xs mr-2 text-right">{item.label}</div>
                                <div className="w-[70%] border border-[rgb(219,219,219)]">
                                    <input
                                        type="number"
                                        className="w-full h-full outline-none text-xs py-1 px-2"
                                    />
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