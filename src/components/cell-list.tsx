import React from 'react';
import {useTypedSelector} from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import {Cell} from "../state/cell";

const CellList: React.FC = () => {

    // @ts-ignore
    const cells = useTypedSelector(({// @ts-ignore
                                        cells: order, data}) => {
            // @ts-ignore
            return order?.map((id) => {
                return data[id];
            })
        }
    );

    const renderedCells = cells.map((cell: Cell) => <CellListItem key={cell.id} cell={cell}/>);

    return (
        <div>
            {renderedCells}
        </div>
    );

};

export default CellList;