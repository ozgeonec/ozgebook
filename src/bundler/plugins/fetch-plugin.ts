import axios from "axios";
import * as esbuild from 'esbuild-wasm';
import * as localforage from "localforage";
//import 'bulma/css/bulma.css';
//import 'tiny-test-pkg';
const fileCache = localforage.createInstance({
    name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {

            build.onLoad({filter: /.*/}, async (args: any) => {
                //Check to see if we have already fetched this file and if it is in the cache
                const cachedResult = await fileCache.getItem(args.path);

                // if it is, return immediately
                if (cachedResult) {
                    return cachedResult;
                }
            });

            build.onLoad({filter: /(^index\.js$)/}, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            });

            //@ts-ignore
            build.onLoad({filter: /.css$/}, async (args: any) => {


                const {data, request} = await axios.get(args.path);


                const escapedCSSString = data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");

                const contents =
                    `
                        const style = document.createElement('style');
                        style.innerText = '${escapedCSSString}';
                        document.head.appendChild(style);
                    `;

                const result = {
                    loader: 'jsx',
                    contents,
                    //@ts-ignore
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                //store response in cache
                await fileCache.setItem(args.path, result);

                return result;
            });

            //@ts-ignore
            build.onLoad({filter: /.*/}, async (args: any) => {

                const {data, request} = await axios.get(args.path);

                const result = {
                    loader: 'jsx',
                    contents: data,
                    //@ts-ignore
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                //store response in cache
                await fileCache.setItem(args.path, result);

                return result;
            });
        }
    }
}