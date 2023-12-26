import React from "react";

import './hexagon.css';

const Hexagon = ({data}) => {
    return (
        <>
            <div style={data?.style} className="hexagon-node"> {data.label} </div>
        </>
    );
};

export default Hexagon;