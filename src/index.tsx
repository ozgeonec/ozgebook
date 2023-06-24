

import React from "react";
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';


const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');



    useEffect(() => {
        // This ugly code is to avoid calling initialize() more than once
        try {
            esbuild.build({
                entryPoints: ['index.js'],
                bundle: true,
                write: false,
                plugins: [unpkgPathPlugin()]
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

    const onClick = () => {
        esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin()]
        })
            .then((result:any) => {
                console.log(result)
                setCode(result.outputFiles[0].text);
            });
    };
    // const startService = async () => {
    //     if (!window.isEsbuildRunning) {
    //         await esbuild.initialize({Ï
    //             worker: true,
    //             wasmURL: '/esbuild.wasm'
    //         })
    //     }
    //     window.isEsbuildRunning = true;
    //     ref.current = true
    // }
    //
    // useEffect(() => {
    //     startService()
    // }, [])
    //
    // const onClick = async () => {
    //     if (!ref.current) {
    //         return;
    //     }
    //     const result = await esbuild.build({
    //         entryPoints: ['index.js'],
    //         bundle: true,
    //         write: false,
    //         plugins: [unpkgPathPlugin()]
    //     })
    //     console.log(result);
    //     setCode(result)
    // }
    return (
        <div>
      <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
      ></textarea>
            {/*<div>hi</div>*/}
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <pre>{code}</pre>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
// ReactDOM.render(<App />, document.querySelector('#root'));
