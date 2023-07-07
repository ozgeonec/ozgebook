import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from "./plugins/fetch-plugin";

const Bundle = async (rawCode: string) => {
    let result: any;

    try {
        const res = await esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)]
        });
        return {
            code: res.outputFiles[0].text,
            err: ''
        }
        // result = res.outputFiles[0].text;

    } catch (error) {
        if (error instanceof Error && error.message.includes('initialize')) {
            esbuild.initialize({
                worker: false,
                wasmURL: '/esbuild.wasm',
            });
            return {
                code: '',
                err: error.message
            }
        } else {
            return {
                code: '',
                //@ts-ignore
                err: error.message
            }
        }
    }
    // return result;
};

export default Bundle;
