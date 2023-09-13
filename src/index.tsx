import React from "react";
import {createRoot} from 'react-dom/client';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import {Provider} from 'react-redux';
import {store} from "./state";
import CellList from "./components/cell-list";
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {

    return (
        <Provider store={store}>
            <div>
                <CellList />
            </div>
        </Provider>
    );
};

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App/>);

