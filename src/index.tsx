import React from "react";
import * as esbuild from 'esbuild-wasm';
import {useState, useEffect, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App = () => {
    // const ref = useRef<any>();
    const [input, setInput] = useState('');
    const iframe = useRef<any>();


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

    const onClick = () => {

        iframe.current.srcdoc = html;

        esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(input)]

        }).then((result: any) => {
            // setCode(result.outputFiles[0].text);

            iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
            // try {
            //     eval(result.outputFiles[0].text);
            // } catch (err) {
            //     alert(err);
            // }
        });
    };

    const html = `
       <html>
       <head></head>
       <body>
       <div id="root"></div>
       <script>
       window.addEventListener('message',(event)=>{
           try {
                eval(event.data);
           } catch (err) {
            const root = document.querySelector('#root');
           root.innerHTML = '<div> <h4>Runtime Error: </h4>' + err + '</div>'
           console.log(err);
           }
      
       },false)
        </script>
        </body>
        </html>
    `;

    return (
        <>
            <CodeEditor/>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}></textarea>
            <div>
                <button onClick={onClick}>Submit</button>
            </div>
            <iframe title="code preview" ref={iframe} sandbox="allow-scripts" srcDoc={html}/>
        </>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);

