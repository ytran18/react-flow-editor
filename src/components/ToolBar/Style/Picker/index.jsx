import React from "react";

import { Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const Picker = (props) => {

    const { item, type } = props;

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
        'font-style': [
            { label: 'Thin', key: '0' },
            { label: 'Extra Light', key: '1' },
            { label: 'Light', key: '2' },
            { label: 'Normal', key: '3' },
            { label: 'Medium', key: '4' },
            { label: 'Semi Bold', key: '5' },
            { label: 'Bold', key: '6' },
            { label: 'Extra Bold', key: '7' },
            { label: 'Black', key: '8' },
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
        ]
    }[type];

    return (
        <div className="w-full p-2 flex items-center font">
            <div className="w-[30%] text-xs mr-2 text-right">{item.label}</div>
            <div className="w-[70%] relative border border-[rgb(219,219,219)]">
                <div className="flex">
                    <input
                        type={item?.inputType}
                        defaultValue={item?.defaultValue}
                        className="w-full h-full outline-none text-xs py-1 px-2"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Dropdown
                                menu={{items}}
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