import React, {Fragment} from 'react';
import {useTypedSelector} from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import {Cell} from "../state";
import AddCell from "./add-cell";

const CellList: React.FC = () => {
    const cells = useTypedSelector(({cells: {order, data}}) => {
            return order?.map((id) => {
                return data[id];
            })
        }
    );

    const renderedCells = cells.map((cell: Cell) =>
        <Fragment key={cell.id}>
            <CellListItem key={cell.id} cell={cell}/>
            <AddCell previousCellId={cell.id}/>
        </Fragment>
    );

    return (
        <div>
            <AddCell forceVisible={cells.length === 0} previousCellId={null}/>
            {renderedCells}
        </div>
    );
};

export default CellList;