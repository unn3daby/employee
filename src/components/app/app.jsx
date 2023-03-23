import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';
import { Component } from 'react';
import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: false, top: false, id: 1},
                {name: 'Alex M.', salary: 3000, increase: true, top: false, id: 2},
                {name: 'Carl W.', salary: 5000, increase: false, top: false, id: 3}
            ],
            term: '',
            filter: 'all',
            maxId: 4,
            salary: 120
        }
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name: name,
            salary: salary,
            increase: false,
            top: false,
            id: this.state.maxId
        }
        this.setState(({data, maxId}) => {
            return {
                data: [...data, newItem],
                maxId: maxId + 1
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if(item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    /*  countIncrease = (data) => {
        let inc = 0;
        data.forEach(item => {
            if(item.increase) {
                inc = inc + 1;
            }
        });
        return inc;
    } */

    onToggleRise = (id) => {
        console.log(`rise this ${id}`)
    }

    searchEmp = (term, array) => {
        if(term.length === 0) {
            return array;
        }
        return array.filter(item => {
            return item.name.indexOf(term) > -1;
        })
    }

/*     onIncreaseFilter = (array) => {
        this.setState({
            data: array.filter(item => {
                console.log(item);
                return item.increase;
            })
        })
    } */

    onUpdateSearch = (term)  => {
        this.setState({term});
    }
/*     onUpdateData = (data) => {
        this.setState({data});
    } */
    filterPost = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(item => item.top)
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items
        }
    }
    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    changeSalary = (e, data, id) => {
        return data.map(item => {
            if(item.id === id) {
                item.salary = Number(e.target.value.slice(0, -1).replace(/[a-zа-яё]/gi, ''));
                return item;
            }
            else {
                return item;
            }
        })
    }
   
    onChangeSalary = (e, id) => {
        const newData = this.changeSalary(e, this.state.data, id);
        this.setState({data:newData});
    }



    render() {
        const {data, term, filter} = this.state;
        const increased = this.state.data.filter(item => item.increase).length
        const visibleData = this.filterPost(this.searchEmp(term, data), filter);
        return(
            <div className="app">
                <AppInfo 
                    numOfEmployees={data.length}
                    numOfIncrease={increased}
                />
                <div className="search-panel">
                <SearchPanel
                    searchEmp = {this.searchEmp}
                    onUpdateSearch = {this.onUpdateSearch}
                />
                <AppFilter
                    filter = {this.state.filter}
                    onFilterSelect = {this.onFilterSelect}
                />
                </div>
                <EmployersList 
                    data = {visibleData}
                    onDelete = {this.deleteItem}
                    onToggleProp = {this.onToggleProp}
                    onChangeSalary = {this.onChangeSalary}
                    changeSalary = {this.changeSalary}
                />
                <EmployersAddForm
                    onAdd = {this.addItem}
                />
            </div>
        );
    }
}

export default App;

