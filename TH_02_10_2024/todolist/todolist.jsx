import ToDoItem from "../ToDoItem";
import { PlusCircleOutlined } from '@ant-design/icons'

const ToDoList = () => {
    return (
        <div className="ToDoList" style={{marginLeft: '10px'}}>
            <h1>My work 🎯</h1>
            <div>
                <ToDoItem title="Gửi email nộp bài tập về nhà" dueDate="Hôm nay"></ToDoItem>
                <ToDoItem title="Học từ vựng tiếng anh mỗi ngày" dueDate="Ngày mai"></ToDoItem>
                <ToDoItem title="Viết tiểu luận môn Triết học" dueDate="Tuần tới"></ToDoItem>
            </div>
            <div style={{marginTop: '5px'}}>
                <PlusCircleOutlined style={{fontSize: '20px', color: '#d1453b'}} /> Add Task
            </div>
        </div>
    )
}
export default ToDoList;