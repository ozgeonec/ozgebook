import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import {useState, useEffect, useRef} from 'react';
import * as esbuild from 'esbuild-wasm';
import {readFile} from "fs";


const App = () => {

    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');


    const startService = async () => {

        ref.current = await esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm'
        });
        ref.current.transform(input,{
            loader:'jsx'
        });

    };

    useEffect(() => {

        try {
            esbuild.build({});
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

        console.log(ref.current)
        esbuild
            .transform(input, {
                loader: 'jsx',
                target: 'es2015',
            })
            .then((result) => {
                setCode(result.code);
                console.log(result)
            });
    };

    return <div >
        <textarea onChange={(e) => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>
                Submit
            </button>
        </div>
        <pre>{code}</pre>
    </div>;
}


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
