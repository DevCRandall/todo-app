import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import TaskEdit from './TaskEdit'
import Switch from 'react-switch'

export default function SingleTask(props) {
    const { name, done, toDoId } = props.task

    // Below hook controls whether the EDIT form is show/hidden
    const [showEdit, setShowEdit] = useState(false)

    // Below hook brings in currentUser for Admin check
    const { currentUser } = useAuth()

    

    // below will handle the toggle switch
    const handleCompleted = () => {
        let updateCompleted = {
          toDoId: props.task.toDoId,
          name: props.task.name,
          done: !props.task.done,
          categoryId: props.task.categoryId
        }
        axios.put(`http://todoapi.devchristopherrandall.com/api/toDos/${props.task.toDoId}`, updateCompleted).then(response => {
            console.log(response)
            props.getTasks()
        })
    }

    // Below is the custom DELETE function
    const deleteTask = (id) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            axios.delete(`http://todoapi.devchristopherrandall.com/api/toDos/${id}`).then(() => {
                props.getTasks()
            })
        }
    }

    return (
        <tr>
            <td>{name}</td>
            <td>{props.task.category.catName}</td>
            <td>
                <Switch checked={done} onChange={() => handleCompleted()} />
            </td>
            {/* EDIT/DELETE UI = ONLY show to Admin */}
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <td>
                    <button onClick={() => setShowEdit(true)} id='editLink'>
                        <FaEdit />
                    </button>
                    <button onClick={() => deleteTask(toDoId)} id='deleteLink'>
                        <FaTrashAlt />
                    </button>
                    {showEdit && <TaskEdit task={props.task} showEdit={showEdit} setShowEdit={setShowEdit} getTasks={props.getTasks} />}
                </td>
            )}
        </tr>
    )
}
