import './app-filter.scss';

const AppFilter = (props) => {
    const buttonsData = [
        {name: 'all', label: 'Все сотрудники'},
        {name: 'rise', label: 'На повышение'},
        {name: 'moreThan1000', label: 'З/П больше 1000$'}
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name
        const activeClassName = active?"btn-light":"btn-outline-light";
        return (
            <button 
            className={`btn ${activeClassName}`}
            type="button"
            key = {name}
            onClick = {() => props.onFilterSelect(name)}>
                {label}
            </button>
        );
    })

    return (
        <div className="btn-group">
           {buttons}
        </div>
    );
}

export default AppFilter;