import React, { useState, useEffect } from 'react'; 
import { Checkbox } from '@mui/material';

function TaskModal({ open, handleClose, taskData, setTaskData, handleSubmit, user, users }) {
  const [subtasks, setSubtasks] = useState([]);

  useEffect(() => {
    if (open && taskData.subtasks) {
      setSubtasks(taskData.subtasks);
    } else {
      setSubtasks([]);
    }
  }, [open, taskData.subtasks]);

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Thêm tasks mới</h2>
        
        <div className="modal-body">
          <div className="form-field">
            <label>Tiêu đề *</label>
            <input
              type="text"
              value={taskData.title}
              onChange={(e) => setTaskData({...taskData, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-field">
            <label>Mô tả</label>
            <textarea
              value={taskData.description || ''}
              onChange={(e) => setTaskData({...taskData, description: e.target.value})}
            />
          </div>
          
          <div className="form-field">
            <label>Ngày đến hạn *</label>
            <input
              type="date"
              value={taskData.due_date}
              onChange={(e) => setTaskData({...taskData, due_date: e.target.value})}
              required
            />
          </div>

          {/* Thêm select box cho assigned_to nếu user là admin */}
          {(user?.role === 'admin' || user?.role === 'manager') && (
            <div className="form-field">
              <label>Giao cho</label>
              <select
                value={taskData.assigned_to || ''}
                onChange={(e) => setTaskData({
                  ...taskData, 
                  assigned_to: e.target.value ? Number(e.target.value) : null
                })}
              >
                <option value="">-- Chọn người thực hiện --</option>
                {users
                  ?.filter(u => u.id !== user.id) // Loại bỏ người đang đăng nhập
                  .map(u => (
                    <option key={u.id} value={u.id}>
                      {u.username} ({u.role})
                    </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-field">
            <label>
              <Checkbox
                checked={taskData.completed}
                onChange={(e) => setTaskData({...taskData, completed: e.target.checked})}
              />
              Đã hoàn thành
            </label>
          </div>

          {/* Phần nhiệm vụ phụ */}
          <div className="subtasks-section">
            <div className="section-header">
              <h3>Tasks phụ</h3>
              <button 
                type="button" 
                className="add-button"
                onClick={() => setSubtasks([...subtasks, {
                  id: subtasks.length + 1,
                  title: '',
                  due_date: '',
                  created_by: user?.id,
                  assigned_to: null,
                  completed: false
                }])}
                disabled={taskData.completed}
                style={{ 
                  opacity: taskData.completed ? 0.5 : 1,
                  cursor: taskData.completed ? 'not-allowed' : 'pointer'
                }}
              >
                +
              </button>
            </div>

            {subtasks.length > 0 && (
              <div className="subtasks-list">
                <table>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th>Hoàn thành</th>
                      <th>Nhiệm vụ</th>
                      <th>Hạn</th>
                      <th>Người tạo</th>
                      <th>Giao cho</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {subtasks.map((subtask, index) => (
                      <tr key={subtask.id}>
                        <td>{index + 1}</td>
                        <td>
                          <Checkbox
                            checked={subtask.completed}
                            onChange={(e) => {
                              const newSubtasks = [...subtasks];
                              newSubtasks[index].completed = e.target.checked;
                              setSubtasks(newSubtasks);
                            }}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            value={subtask.title}
                            onChange={(e) => {
                              const newSubtasks = [...subtasks];
                              newSubtasks[index].title = e.target.value;
                              setSubtasks(newSubtasks);
                            }}
                            placeholder="Nhập nhiệm vụ phụ"
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            value={subtask.due_date}
                            onChange={(e) => {
                              const newSubtasks = [...subtasks];
                              newSubtasks[index].due_date = e.target.value;
                              setSubtasks(newSubtasks);
                            }}
                          />
                        </td>
                        <td>
                          {subtask.created_by_name || user.username} 
                        </td>
                        <td>
                          {(user?.role === 'admin' || user?.role === 'manager') ? (
                            <select
                              value={subtask.assigned_to || ''}
                              onChange={(e) => {
                                const newSubtasks = [...subtasks];
                                newSubtasks[index].assigned_to = e.target.value ? Number(e.target.value) : null;
                                setSubtasks(newSubtasks);
                              }}
                            >
                              <option value="">-- Chọn người thực hiện --</option>
                              {users
                                ?.filter(u => u.id !== user.id) // Chỉ thêm filter này
                                .map(u => (
                                  <option key={u.id} value={u.id}>
                                    {u.username} ({u.role})
                                  </option>
                                ))}
                            </select>
                          ) : (
                            <span>Không có quyền giao việc</span>
                          )}
                        </td>
                        <td>
                          <button 
                            type="button"
                            className="remove-button"
                            onClick={() => setSubtasks(subtasks.filter((_, i) => i !== index))}
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={handleClose} className="btn-cancel">
            Hủy
          </button>
          <button 
            onClick={() => {
              const formData = {
                ...taskData,
                assigned_to: taskData.assigned_to || null,  // Đảm bảo gửi assigned_to
                subtasks: subtasks.map(st => ({
                  ...st,
                  completed: st.completed ? 1 : 0,
                  created_by: user.id,
                  assigned_to: st.assigned_to || null
                }))
              };
              console.log('Submitting form data:', formData);
              handleSubmit(formData);
            }} 
            className="btn-submit"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;