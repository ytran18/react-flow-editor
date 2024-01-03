export const getNodeType = (type) => {
    const customType = {
        'hexagon': 'hexagon',
        'diamond': 'diamond',
        'arrow-retangle': 'arrowRectangle',
        'triangle': 'triangle',
        'parallelogram': 'parallelogram',
        'cylinder': 'cylinder',
        'plus': 'plus',
        'circle': 'circle',
        'rounded-rectangle': 'roundedRectangle',
        'rectangle': 'rectangle',
        'custom': 'custom',
    }[type];

    return customType;
};

export const getNodeBackgroundColor = (type) => {
    const background = {
        'hexagon': 'none',
        'diamond': 'none',
        'arrow-retangle': 'none',
        'triangle': 'none',
        'parallelogram': 'none',
        'cylinder': 'none',
        'plus': 'none',
        'circle': 'none',
        'rounded-rectangle': 'none',
        'rectangle': 'none',
    }[type] || '#eee';
    
    return background;
};

export const getNodeBorderWidth = (type) => {
    const borderWidth = {
        'hexagon': 'none',
        'diamond': 'none',
        'arrow-retangle': 'none',
        'triangle': 'none',
        'parallelogram': 'none',
        'cylinder': 'none',
        'plus': 'none',
        'circle': 'none',
        'rounded-rectangle': 'none',
        'rectangle': 'none',
    }[type] || '1px';

    return borderWidth;
};

export const getFontWeigth = (value, type) => {
    let fontWeigth;
    if (type = 'number') {
        fontWeigth = {
            'Thin': 100,
            'Extra Light':200,
            'Light': 300,
            'Normal': 400,
            'Medium': 500,
            'Semi Bold': 600,
            'Bold': 700,
            'Extra Bold': 800,
            'Black': 900,
        }[value];
    };

    if (type === 'label') {
        fontWeigth = {
            100: 'Thin',
            200: 'Extra Light',
            300: 'Light',
            400: 'Normal',
            500: 'Medium',
            600: 'Semi Bold',
            700: 'Bold',
            800: 'Extra Bold',
            900: 'Black',
        }[value];
    };

    return fontWeigth;
};

export const getColorPickerState = (type) => {
    const typeChange = {
        'currColor': 'currNodeTitleColor',
        'currBackground': 'currNodeBg',
        'currBorderColor': 'currNodeBorderColor',
        'currShadowColor': 'currNodeShadowColor',
    }[type];

    return typeChange;
};

export const getInputPickerState = (type) => {
    const typeChange = {
        'font': 'currNodeFont',
        'font-size': 'currNodeFontSize',
        'font-weight': 'currNodeFontWeight',
        'border-style': 'currNodeBorderStyle',
        'shape': 'currNodeType',
    }[type];

    return typeChange;
};
