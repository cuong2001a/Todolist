import React, { memo, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
const ToDo = memo((props) => {
    const { editToDo } = props
    console.log(editToDo);
    const [text, setText] = useState(editToDo?.title ? editToDo?.title :"");
    
    const onAddToDo = (e) => {
        e.preventDefault();
        const data = {
            id: uuid(),
            title: text,
            complete: false
        }
        props.addToDo(data)
        setText("");
        console.log(text);
    }
    const onEditToDo = (e) => {
        e.preventDefault();
        const data = {
            ...editToDo,
            title: text
        }
        props.editTask(data);
        setText("");
        console.log(text);
    }
    useEffect(() => {
      
    }, [])
    return (
        <div>
            {editToDo?.title ? (
                <>
                    {editToDo?.title}
                    <form action="" onSubmit={onEditToDo}>
                        <input type="text" className='input-todo' value={text}
                            onChange={e=> setText(e.target.value)} />
                        <button type='submit'>Edit</button>
                    </form>
                </>
            ) : (
                <>
                    <form action="" onSubmit={onAddToDo}>
                        <input type="text" className='input-todo' value={text}
                            onChange={(e) => setText(e.target.value)} />
                        <button type='submit'>Submit</button>
                    </form>
                </>
            )}

        </div>

    )
})

export default ToDo
