import React, { useEffect, useState } from 'react';
import { ToDoApi } from '../axios/Todoapi';
const ToDoList = (props) => {
  const { task, setTask, } = props;
  const [choice, setChoice] = useState({});
  const remove = async (id) => {
    console.log(id);
    const newData = task.filter(item => item.id !== id);
    console.log(newData);
    setTask(newData);
    await ToDoApi.remove(id);
  }
  const checkSuccess = (id) => {
    props.checkList(id);
  }
  const removeAll = async (e) => {
    e.preventDefault();
    task.forEach(async (item) => {
      await ToDoApi.remove(item.id);
    })
    setTask([])
  }
  const removeComplete = (e) => {
    e.preventDefault();
    task.forEach(async (item) => {
      if (item.complete === true) {
        await ToDoApi.remove(item.id);
      }
    })
    setTask(prev => prev.filter(item => item.complete === false));
  }
  const EditToDo = async (data) => {
    setChoice(data);
    if (data.complete !== true) {
      props.readTaskId(data.id);
    }
  }
  useEffect(() => {
    console.log(task);
  }, [])

  return (
    <ul className='p-0'>
      {task && task.map((item, index) => {
        return (
          <>
            <div key={index} className={item.complete === true ? 'todo complete' : "todo"} >
              <div className='todo_title' onClick={() => checkSuccess(item.id)}>{item.title}</div>
              <div>
                <i className="fas fa-edit fs-5 mx-1 text-warning" onClick={() => EditToDo(item)}></i>
                <i className="fas fa-trash-alt fs-5 mx-1 text-danger" onClick={() => remove(item.id)}></i>
              </div>
            </div>
            {item.complete === true && choice.id === item.id && <div className='text-danger'>Khong sua duoc to do list này</div>}
          </>
        )
      })}
      {task.length > 0 ? <> <button onClick={removeAll}>Clear all</button>
        <button className='mx-1' onClick={removeComplete}>Remove complete</button>
      </> : ''}

    </ul>
  );
};

export default ToDoList;
