import React from "react";
import * as esbuild from 'esbuild-wasm';
import {useState, useEffect} from 'react';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import {unpkgPathPlugin} from '../bundler/plugins/unpkg-path-plugin';
import {fetchPlugin} from "../bundler/plugins/fetch-plugin";
import CodeEditor from "./code-editor";
import Preview from "./preview";
// import bundle from './bundler';

const CodeCell = () => {
    // const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    useEffect(() => {
        try {
            esbuild.build({
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                plugins: [unpkgPathPlugin(), fetchPlugin(input)]
            });
        } catch (error) {
            if (error instanceof Error && error.message.includes('initialize')) {
                esbuild.initialize({
                    worker: false,
                    wasmURL: '/esbuild.wasm',
                });
            } else {
                throw error;
            }
        }
    }, []);

    const onClick = async () => {

        // const output = await bundle(input);
        //
        // console.log('out', output)
        // // @ts-ignore
        // setCode(output);

        esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)]

        }).then((result: any) => {
            setCode(result.outputFiles[0].text);


            // try {
            //     eval(result.outputFiles[0].text);
            // } catch (err) {
            //     alert(err);
            // }
        });
    };


    return (
        <>
            <CodeEditor initialValue={'const a= 1'} onChange={(value) => setInput(value)}/>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <Preview code={code}/>
        </>
    );
};

export default CodeCell;
// const container = document.getElementById('root');
// const root = createRoot(container!); // createRoot(container!) if you use TypeScript
// root.render(<CodeCell/>);

