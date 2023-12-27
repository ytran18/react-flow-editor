const circle = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <ellipse cx="13" cy="13" rx="13" ry="13" fill="transparent" strokeWidth="1"></ellipse>
            </g>
        </svg>
    </div>
);

const roundedRetangle = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <rect x="0" y="0" rx="5.2" width="26" height="26" fill="transparent" strokeWidth="1"></rect>
            </g>
        </svg>
    </div>
);

const retangle = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <rect x="0" y="0" width="26" height="26" fill="transparent" strokeWidth="1"></rect>
            </g>
        </svg>
    </div>
)
const hexagon = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <path d="M0,13 L2.6,0 L23.4,0 L26,13 L23.4,26 L2.6,26 Z" fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    </div>
)
const diamond = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <path d="M0,13 L13,0 L26,13 L13,26 Z" fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    </div>
)
const arrowRetangle = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <path d="M0,0 L23.4,0 L26,13 L23.4,26 L0,26 Z" fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    </div>
);

const triangle = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <path d="M0,26 L13,0 L26,26 Z" fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    </div>
);
const cylinder = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <path d="M0,26 L6.5,0 L26,0 L19.5,26 Z" fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    </div>
);

const parallelogram = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <path d="M0,3.25  L 0,22.75 A 13 3.25 0 1 0 26 22.75 L 26,3.25 A 13 3.25 0 1 1 0 3.25 A 13 3.25 0 1 1 26 3.25 A 13 3.25 0 1 1 0 3.25 z" fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    </div>
);

const plus = (
    <div className="p-2 flex items-center justify-center hover:bg-[rgb(226,232,240)] cursor-pointer rounded">
        <svg width="28" height="28" className="stroke-black">
            <g transform="translate(1, 1)">
                <path d="M8.666666666666666,0 L17.333333333333332,0 L17.333333333333332,8.666666666666666 L26,8.666666666666666 L26,17.333333333333332 L26,17.333333333333332 L17.333333333333332,17.333333333333332 L17.333333333333332,26 L17.333333333333332,26 L8.666666666666666,26 L8.666666666666666,17.333333333333332 L0,17.333333333333332 L0,8.666666666666666 L8.666666666666666,8.666666666666666 Z" fill="transparent" strokeWidth="1"></path>
            </g>
        </svg>
    </div>
);

export { circle, roundedRetangle, retangle, arrowRetangle, diamond, hexagon, cylinder, triangle, parallelogram, plus };