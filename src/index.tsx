import React from "react";
import {createRoot} from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import {Provider} from 'react-redux';
// import CodeCell from "./components/code-cell";
import TextEditor from "./components/text-editor";
import {store} from "./state";

const App = () => {

    return (
        <Provider store={store}>
            <TextEditor/>
        </Provider>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);

