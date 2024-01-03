import React from "react";

import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Picker = (props) => {

    const { item, type, currNodeFontSize, handleChangeInputPicker, currNodeFontWeight, currNodeBorderStyle, currNodeTypeNode } = props;

    const items = {
        'font': [
            { label: 'Font 1', key: '0' },
            { label: 'Font 2', key: '1' },
            { label: 'Font 3', key: '2' },
            { label: 'Font 4', key: '3' },
            { label: 'Font 5', key: '4' },
            { label: 'Font 6', key: '5' },
            { label: 'Font 7', key: '6' },
            { label: 'Font 8', key: '7' },
        ],
        'font-size': [
            { label: '12', key: '0' },
            { label: '14', key: '1' },
            { label: '16', key: '2' },
            { label: '18', key: '3' },
            { label: '20', key: '4' },
            { label: '24', key: '5' },
            { label: '32', key: '6' },
            { label: '36', key: '7' },
        ],
        'font-weight': [
            { label: 'Thin', key: '0', value: 100 },
            { label: 'Extra Light', key: '1', value: 200 },
            { label: 'Light', key: '2', value: 300 },
            { label: 'Normal', key: '3', value: 400 },
            { label: 'Medium', key: '4', value: 500 },
            { label: 'Semi Bold', key: '5', value: 600 },
            { label: 'Bold', key: '6', value: 700 },
            { label: 'Extra Bold', key: '7', value: 800 },
            { label: 'Black', key: '8', value: 900 },
        ],
        'border-style': [
            { label: 'dotted', key: '0' },
            { label: 'dashed', key: '1' },
            { label: 'solid', key: '2' },
            { label: 'double', key: '3' },
            { label: 'groove', key: '4' },
            { label: 'ridge', key: '5' },
            { label: 'inset', key: '6' },
            { label: 'outset', key: '7' },
            { label: 'none', key: '8' },
            { label: 'hidden', key: '9' },
        ],
        'shape': [
            { label: 'Circle', key: '0', value: 'circle' },
            { label: 'Rounded Rectangle', key: '1', value: 'roundedRectangle' },
            { label: 'Rectangle', key: '2', value: 'rectangle' },
            { label: 'Hexagon', key: '3', value: 'hexagon' },
            { label: 'Diamond', key: '4', value: 'diamond' },
            { label: 'Arrow Rectangle', key: '5', value: 'arrowRectangle' },
            { label: 'Cylinder', key: '6', value: 'cylinder' },
            { label: 'Triangle', key: '7', value: 'triangle' },
            { label: 'Parallelogram', key: '8', value: 'parallelogram' },
            { label: 'Plus', key: '9', value: 'plus' },
            { label: 'Custom', key: '10', value: 'custom' },
        ],
    }[type];

    const handleChangeInput = (e, type) => {
        handleChangeInputPicker(e?.target?.value, type)
    };

    const onClick = (e) => {
        const value = {
            'font': items.find(ele => ele.key === e.key)?.label,
            'font-size': items.find(ele => ele.key === e.key)?.label,
            'font-weight': items.find(ele => ele.key === e.key)?.label,
            'border-style': items.find(ele => ele.key === e.key)?.label,
            'shape': items.find(ele => ele.key === e.key)?.value,
        }[type];

        handleChangeInputPicker(value, type);
    };

    const inputValue = {
        'font': 'Font 1',
        'font-size': currNodeFontSize || 14,
        'font-weight': currNodeFontWeight || 'Normal',
        'border-style': currNodeBorderStyle || 'solid',
        'shape': currNodeTypeNode || 'custom',
    }[type];

    const disable = type === 'shape';

    return (
        <div className="w-full p-2 flex items-center">
            <div className="w-[30%] text-xs mr-2 text-right">{item.label}</div>
            <div className="w-[70%] relative border border-[rgb(219,219,219)]">
                <div className="flex">
                    <input
                        type={item?.inputType}
                        value={inputValue}
                        disabled={disable}
                        onChange={(e) => handleChangeInput(e, type)}
                        className="w-full h-full outline-none text-xs py-1 px-2"
                    />
                    <div className="absolute flex items-center right-2 top-1/2 transform -translate-y-1/2">
                        <Dropdown
                            menu={{items, onClick}}
                            trigger={['click']}
                            placement="bottomRight"
                        >
                            <DownOutlined />
                        </Dropdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Picker;