import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import { useAuth } from '../../contexts/AuthContext'
import FilterTask from './FilterTask';
import SingleTask from './SingleTask';
import TaskCreate from './TaskCreate';
import './Tasks.css'

export default function ToDo() {

  const [tasks, setTasks] = useState([]);

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false);

  const [filter, setFilter] = useState(0);

    const getTasks = () => {
      axios.get(`http://todoapi.devchristopherrandall.com/api/ToDos`).then(response => {
        console.log(response)
        setTasks(response.data)
      })
    }

  useEffect(() => {
    getTasks()
  }, []);

  return (
    <section className="tasks">
      <article className="bg-info p-5">
        <h1 className="text-center">Task Dashboard</h1>
      </article>

      {/* Begin CREATE UI = Only show to Admin */}
      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="bg-dark p-2 mb-3 text-center" >
          <button className="btn btn-info" onClick={() => setShowCreate(!showCreate)}>
            {!showCreate ? 'Create New Task' : 'Cancel'}
          </button>
          <div className="createContainer">
            {showCreate &&
              // Render Resource Create component when showCreate is true.
              <TaskCreate getTasks={getTasks} setShowCreate={setShowCreate}/>
            }
          </div>
        </div>
      }

      <FilterTask setFilter={setFilter} />
      <Container>
        <article className="taskGallery row justify-content-center">
          {/* Below we write conditional rendering to see if the user is trying to filter results or not, and display the right resources according to what they want. */}
          {filter === 0 ? tasks.map(t => 
            <SingleTask key={t.toDoId} task={t} getTasks={getTasks} />
          ) : 
            tasks.filter(t => t.categoryId === filter).map(t => 
            <SingleTask key={t.toDoId} task={t} getTasks={getTasks} />  
          )}
          {filter !==0 && tasks.filter(t => t.categoryId === filter).length === 0 &&
            <h2 className="alert alert-warning text-dark">
              There are no results for this category.
            </h2> }
        </article>
      </Container>
    </section>
  )
}
