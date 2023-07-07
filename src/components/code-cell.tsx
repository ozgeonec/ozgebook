import React from "react";
import {useState, useEffect} from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeEditor from "./code-editor";
import Preview from "./preview";
import ResizableComp from "./resizableComp";
import Bundle from "../bundler";


const CodeCell = () => {
    // const ref = useRef<any>();
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
        // const buildCode = async () => {
        //     try {
        //         const result = await esbuild.build({
        //             entryPoints: ['index.js'],
        //             bundle: true,
        //             write: false,
        //             plugins: [unpkgPathPlugin(), fetchPlugin(input)]
        //         });
        //         setCode(result.outputFiles[0].text);
        //     } catch (error) {
        //         if (error instanceof Error && error.message.includes('initialize')) {
        //             esbuild.initialize({
        //                 worker: false,
        //                 wasmURL: '/esbuild.wasm',
        //             });
        //         } else {
        //             throw error;
        //         }
        //     }
        // };
        //
        // let timer = setTimeout(buildCode, 1000);
        //
        // return () => {
        //     clearTimeout(timer);
        // };
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
// const container = document.getElementById('root');
// const root = createRoot(container!); // createRoot(container!) if you use TypeScript
// root.render(<CodeCell/>);

