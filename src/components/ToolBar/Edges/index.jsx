import React, { useState, useRef, useEffect } from "react";

import { SketchPicker } from 'react-color';

import Picker from "../Style/Picker";

const Edges = (props) => {

    const { currEdgeId, currEdgeLabel, currEdgeColor, currEdgeSize, currEdgeMarker, currEdgeType,
            handleChangeColor, handleChangeText, currEdgeIsAnimated, handleChangeCheckbox, handleChangeInputPicker } = props;

    const [state, setState] = useState({
        isDisplayColorPicker: false,
        currColor: '',
        currLabel: '',
        currType: '',
        currSize: '',
        currMarker: ''
    });

    const colorPickerEdgesRef = useRef(null);

    useEffect(() => {
        setState(prev => ({...prev,
            currColor: currEdgeColor,
            currLabel: currEdgeLabel,
            currType: currEdgeType,
            currSize: currEdgeSize,
            currMarker: currEdgeMarker,
        }));
    },[currEdgeLabel, currEdgeColor, currEdgeSize, currEdgeMarker, currEdgeType]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (colorPickerEdgesRef.current && !colorPickerEdgesRef.current.contains(event.target)) {
                setState(prev => ({
                    ...prev,
                    isDisplayColorPicker: false,
                }));
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const title = [
        { label: 'ID', type: 'text', textType: 'edges-id' },
        { label: 'Label', type: 'text', textType: 'edges-label' },
        { label: 'Color', type: 'color', state: 'isDisplayColorPicker', curr: 'currColor' },
        { label: 'Size', type: 'picker', pickerType: 'edges-size', inputType: 'text', defaultValue: 'Normal' },
        { label: 'Marker', type: 'picker', pickerType: 'edges-marker', inputType: 'text', defaultValue: 'arrow' },
        { label: 'Type', type: 'picker', pickerType: 'edges-type', inputType: 'text', defaultValue: 'default' },
        { label: 'Animated', type: 'true-false' },
    ];

    const handleChangeComplete = (color, isOnChange) => {
        if (isOnChange) {
            setState(prev => ({...prev, currColor: color}));
        } else {
            setState(prev => ({...prev, currColor: color.hex}));
        };

        const colorChange = isOnChange ? color : color.hex;

        handleChangeColor(colorChange, 'currEdgeColor');
    };

    return (
        <div className="p-2 w-full overflow-y-auto h-full scrollbar-hide">
            {title.map((item, index) => {
                return (
                    <div className="" key={`edge-style-${index}`}>
                        {item.type === 'text' && (
                            <div className="w-full p-2 flex items-center">
                                <div className="w-[30%] text-xs mr-2 text-right">{item.label}</div>
                                <div className="w-[70%] border border-[rgb(219,219,219)]">
                                    <input
                                        disabled={item?.textType === 'edges-id'}
                                        value={item?.textType === 'edges-label' ? currEdgeLabel : currEdgeId}
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
                                        value={state.currColor}
                                        onChange={(e) => handleChangeComplete(e.target.value, true)}
                                        className="w-full h-full outline-none text-xs py-1 px-2"
                                    />
                                    <div
                                        onClick={() => setState(prev => ({...prev, isDisplayColorPicker: !state.isDisplayColorPicker}))}
                                        style={{background: state.currColor}}
                                        className={`w-4 h-4 border border-solid border-[#333] cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2`}
                                    ></div>
                                    {state.isDisplayColorPicker && (
                                        <div
                                            ref={colorPickerEdgesRef}
                                            className="absolute top-[110%] right-0 z-10"
                                        >
                                            <SketchPicker 
                                                color={state.currColor}
                                                onChangeComplete={(color) => handleChangeComplete(color)}
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
                                    currEdgeSize={currEdgeSize}
                                    currEdgeMarker={currEdgeMarker}
                                    currEdgeType={currEdgeType}
                                    handleChangeInputPicker={handleChangeInputPicker}
                                />
                            </div>                        
                        )}

                        {item.type === 'true-false' && (
                            <div className="w-full p-2 flex items-center">
                                <div className="w-[30%] flex items-center text-xs mr-2 justify-end">{item.label}</div>
                                <div className="w-[70%] flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={currEdgeIsAnimated}
                                        onChange={(e) => handleChangeCheckbox(e)}
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

export default Edges;