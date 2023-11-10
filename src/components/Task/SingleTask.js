import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import axios from 'axios'
import TaskEdit from './TaskEdit'

export default function SingleTask(props) {
  const { name, description, toDoId } = props.task

  // Below hook controls whether the EDIT form is show/hidden
  const [showEdit, setShowEdit] = useState(false)

  // Below hook brings in currentUser for Admin check
  const { currentUser } = useAuth()

  // Below is the custom DELETE function
  const deleteTask = (id) => {
    if(window.confirm(`Are you sure you want to delete ${name}?`)){
      axios.delete(`http://todoapi.devchristopherrandall.com/api/toDos/${id}`).then(() => {
        props.getTasks()
      })
    }
  }

  return (
    <div className='singleTask col-md-5 m-4'>
      {/* EDIT/DELETE UI = ONLY show to Admin */}
      { currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div>
          <button onClick={() => setShowEdit(true)} id="editLink">
            <FaEdit />
          </button>
          <button onClick={() => deleteTask(toDoId)} id="deleteLink">
            <FaTrashAlt />
          </button>
          {showEdit &&
            <TaskEdit
              task={props.task}
              showEdit={showEdit}
              setShowEdit={setShowEdit}
              getTasks={props.getTasks} />
          }
        </div>
      }
      <h3>{name}</h3>
      {description !== null ? 
        <p>{description}</p> : <p>No description provided</p>
      }
    </div>
  )
}
