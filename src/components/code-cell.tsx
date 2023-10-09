import React from "react";
import {useState, useEffect} from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeEditor from "./code-editor";
import Preview from "./preview";
import ResizableComp from "./resizableComp";
import Bundle from "../bundler";
import {Cell} from "../state";
import {useActions} from "../hooks/use-actions";

interface CodeCellProps {
    cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {

    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const {updateCell} = useActions();

    useEffect(() => {

        const timer = setTimeout(async () => {
            const output = await Bundle(cell.content);
            setCode(output.code);
            setErr(output.err);
        }, 750);

        return () => {
            clearTimeout(timer);
        };

    }, [cell.content]);


    return (
        <ResizableComp direction='vertical'>
            <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <ResizableComp direction='horizontal'>
                    <CodeEditor initialValue={cell.content} onChange={(value) => updateCell(cell.id,value)}/>
                </ResizableComp>
                <Preview code={code} bundlingStatus={err}/>
            </div>
        </ResizableComp>
    );
};

export default CodeCell;


