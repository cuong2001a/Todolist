import ToDo from "./component/ToDo";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./component/Header";
import { v4 as uuid } from 'uuid';
import { useFormik } from "formik";
import './App.css'
import { ToDoApi } from './axios/Todoapi';
import { useEffect, useState } from 'react';
import ToDoList from "./component/ToDoList";
import * as Yup from 'yup';
function App() {
  const [task, setTask] = useState([])
  const [editToDo, setEditToDo] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const getAllTask = async () => {
    const { data } = await ToDoApi.list();
    setTask(data);
  }
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      alert('vui long nhap to do list')
    } else if (name && isEditing) {
      console.log('edit');
      const { data } = await ToDoApi.read(id);
      const newData = {
        ...data,
        title: name
      }
      await ToDoApi.edit(id, newData);
      setTask(prev => prev.map(item => (item.id === id ? newData : item)));
      setName('');
      setIsEditing(false);
      setId('');

    } else {
      console.log('post');
      const newData = {
        id: uuid(),
        title: name,
        complete: false
      }
      await ToDoApi.add(newData);
      setTask([...task, newData])
      setName('')
    }
  }

  const removeTask = async (id) => {
    await ToDoApi.remove(id);
    const newToDo = task.filter(item => task.id !== item.id);
    setTask(newToDo);
  }
  const readTaskId = async (id) => {
    const { data } = await ToDoApi.read(id);
    console.log(data);
    setId(data.id)
    setName(data.title);
    setIsEditing(true);
  }
  const checkList = async (id) => {
    console.log(id);
    const { data } = await ToDoApi.read(id);
    const newData = {
      ...data,
      complete: !data.complete
    }
    await ToDoApi.edit(id, newData);
    setTask(prev => prev.map(item => (item.id === id ? newData : item)));
  }
  const TodoSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Todo too Short !')
      .max(50, 'To do too Long!')
      .required('Required To do')
  });
  const formik = useFormik({
    initialValues: {
      name: name
    },
    validationSchema: TodoSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (name && isEditing) {
        console.log(name);
        const { data } = await ToDoApi.read(id);
        console.log(data);
        const newData = {
          ...data,
          title: values.name,
        }
        await ToDoApi.edit(id, newData);
        setTask(prev => prev.map(item => item.id === id ? newData : data))
        setName('')
        setId('')
        setIsEditing(false);
      } else {
        const data = {
          id: uuid(),
          title: values.name,
          complete: false
        }
        console.log(data);
        await ToDoApi.add(data);
        setTask([...task, data]);
        values.name = ''
      }

    }

  })
  useEffect(() => {
    getAllTask();
    console.log(name);
  }, [name])
  return (
    <div className="App my-3">
      <Header />
      <form action="" onSubmit={formik.handleSubmit}>
        <input type="text" id="name" name="name" className='input-todo' value={formik.values.name}
          onChange={formik.handleChange} onBlur={formik.handleBlur} />
        <button type='submit'>{isEditing ? 'Edit' : "Submit"}</button>
        {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
      </form>
      {/* <ToDo addToDo={addTask} editTask={editTask} editToDo={editToDo} /> */}
      <ToDoList task={task} setTask={setTask} removeTask={removeTask} readTaskId={readTaskId} checkList={checkList} />
    </div>
  );
}

export default App;
