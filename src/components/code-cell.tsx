import React from "react";
import {useState, useEffect} from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeEditor from "./code-editor";
import Preview from "./preview";
import ResizableComp from "./resizableComp";
import Bundle from "../bundler";


const CodeCell = () => {

    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {

        const timer = setTimeout(async () => {
            const output = await Bundle(input);
            setCode(output.code);
            setErr(output.err);
        }, 750);

        return () => {
            clearTimeout(timer);
        };

    }, [input]);


    return (
        <ResizableComp direction='vertical'>
            <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                <ResizableComp direction='horizontal'>
                    <CodeEditor initialValue={'const a = 1'} onChange={(value) => setInput(value)}/>
                </ResizableComp>
                <Preview code={code} bundlingStatus={err}/>
            </div>
        </ResizableComp>
    );
};

export default CodeCell;


