import './style.css';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
const ToDoItem = (props) =>{
    return (
        <div className="ToDoItem">
            <input type="checkbox" />
            <div className='ItemContent'>
                <p className='Title'>{props.title}</p>
                <p className='DueDate'>{props.dueDate}</p>
            </div>
            <div className='Action'>
                <EditOutlined />
                <DeleteOutlined />
            </div>
        </div>
    );
}
export default ToDoItem;