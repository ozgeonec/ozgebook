import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from './plugins/unpkg-path-plugin';
import {fetchPlugin} from "./plugins/fetch-plugin";


export default  (rawCode: string) => {

    let result: any;

    try {
         esbuild.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)]
        }).then((res) => {
            result = res.outputFiles[0].text;
            // console.log('hhj', res)
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

    // console.log(result)


    // console.log('res', result.outputFiles[0].text)
    // return result.outputFiles[0].text;
    return result;
};