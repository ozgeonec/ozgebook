import {ResizableBox, ResizableBoxProps} from "react-resizable";
import React, {useEffect, useState} from "react";
import './resizableComp.css';

interface ResizableCompProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

let resizableProps: ResizableBoxProps;

const ResizableComp: React.FC<ResizableCompProps> = ({direction, children}) => {

    const [innerHeight, setInnerHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [width, setWidth] = useState(window.innerWidth * 0.75);

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight);
                setInnerWidth(window.innerWidth);
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75);
                }
            }, 100);
        };
        window.addEventListener('resize', listener);

        return () => {
            window.removeEventListener('resize', listener);
        };

    }, []);


    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            width: width,
            height: Infinity,
            resizeHandles: ["e"],
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            onResizeStop: (event, data) => {
                setWidth(data.size.width);
            }
        };
    } else if (direction === 'vertical') {
        resizableProps = {
            width: Infinity,
            height: 300,
            resizeHandles: ["s"],
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 24],
        };
    }

    return (
        <ResizableBox {...resizableProps}>{children}</ResizableBox>
    );
}


export default ResizableComp;