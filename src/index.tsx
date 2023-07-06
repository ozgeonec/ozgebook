import React from "react";
import {createRoot} from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeCell from "./components/code-cell";

const App = () => {


    return (
        <>
            <CodeCell/>
        </>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);

