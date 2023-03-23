import EmployersListItem from "../employers-list-item/employers-list-item";

import './employers-list.css';


const EmployersList = ({data, onDelete, onToggleProp, onChangeSalary}) => {
    const elements = data.map(({id, ...itemProps}) =>
        <EmployersListItem 
            key = {id} 
            {...itemProps}
            onDelete = {() => onDelete(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            onChangeSalary = {(e) => onChangeSalary(e, id)}
        />
    )

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployersList;