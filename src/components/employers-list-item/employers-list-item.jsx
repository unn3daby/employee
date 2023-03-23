import './employers-list-item.css'
import { Component } from 'react';

class EmployersListItem  extends Component {
   constructor(props) {
    super(props);
    this.state = {
        salary: props.salary
    }
   }
   onUpdateSalary = (e) => {
        const salary = Number(e.target.value.slice(0, -1).replace(/[a-zа-яё]/gi, ''));
        this.setState({salary})
        this.props.onChangeSalary(e);
    }

    render() {
        function classNames(className, trigger, setClass) {
            if (trigger) {
               return className+=` ${setClass}`;
            } else {
                return className;
            }
        }
        const {name, salary, onDelete, onToggleProp, increase, top} = this.props;

        return (
            <li className={classNames(classNames("list-group-item d-flex justify-content-between", increase, "increase"), top, "like")}>
                <span 
                onClick = {onToggleProp}
                className="list-group-item-label"
                data-toggle="top">{name}</span>

                <input type="text" 
                className="list-group-item-input" 
                defaultValue={salary + "$"}
                onChange = {(e)=> {this.onUpdateSalary(e)}}
            />
                <div className='d-flex justify-content-center align-items-center'>
                    <button onClick={onToggleProp} 
                    type="button"
                    className="btn-cookie btn-sm "
                    data-toggle="increase">
                        <i className="fas fa-cookie"></i>
                    </button>
                    <button type="button"
                            className="btn-trash btn-sm "
                            onClick={onDelete}>
                        <i className="fas fa-trash"></i>
                    </button>
                    <i className="fas fa-star"></i>
                </div>
            </li>
                );
    }
    
}

export default EmployersListItem;