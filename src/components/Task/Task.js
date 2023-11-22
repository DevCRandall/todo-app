import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import { useAuth } from '../../contexts/AuthContext'
import FilterTask from './FilterTask'
import SingleTask from './SingleTask'
import TaskCreate from './TaskCreate'
import Spinner from '../Spinner/Spinner'

export default function ToDo() {
    const [tasks, setTasks] = useState([])

    const { currentUser } = useAuth()

    const [showCreate, setShowCreate] = useState(false)

    const [filter, setFilter] = useState(0)

    // Below hook will check the state for toggle status
    const [showComplete, setShowComplete] = useState(false)

    const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [tasks]);

    const getTasks = () => {
        axios.get(`http://todoapi.devchristopherrandall.com/api/ToDos`).then((response) => {
            console.log(response)
            setTasks(response.data)
        })
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <section className='categories'>
            <article className='p-5'>
                <h1 className='text-center text-white'>Task Dashboard</h1>
                {!loaded && <Spinner>LOADING...</Spinner>}
            </article>

            {/*Begin CREATE UI = Only show to Admin */}
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && (
                <div className='p-2 mb-3 text-center'>
                    <button className='btn btn-info' onClick={() => setShowCreate(!showCreate)}>
                        {!showCreate ? 'Create New Task' : 'Cancel'}
                    </button>
                    <div className='createContainer'>
                        {showCreate && (
                            // Render Resource Create component when showCreate is true.
                            <TaskCreate getTasks={getTasks} setShowCreate={setShowCreate} />
                        )}
                    </div>
                </div>
            )}

            {/* Below we write conditional rendering to see if the user is trying to filter results or not, and display the right resources according to what they want. */}

            <FilterTask setFilter={setFilter} showComplete={showComplete} setShowComplete={setShowComplete} />
            <Container>
                <table className='table table-dark my-3'>
                    <thead className="table-secondary text-uppercase">
                        <tr>
                            <th>Task</th>
                            <th>Category</th>
                            <th> Completed</th>
                            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Issue is in this statement */}
                        {!showComplete ?
                            <>
                                {filter === 0 ? tasks.filter(t => t.done === false).map(t => 
                                    <SingleTask key={t.toDoId} task={t} getTasks={getTasks} />
                                    ) : 
                                    tasks.filter(t => t.done === false && t.categoryId === filter).map(t => 
                                    <SingleTask key={t.toDoId} task={t} getTasks={getTasks} />
                                    )}
                            </>
                              : 
                            <>
                                {filter === 0 ? tasks.map(t =>
                                <SingleTask key={t.toDoId} task={t} getTasks={getTasks} />
                                ) :
                                tasks.filter(t => t.done === t.categoryId === filter).map(t =>
                                  <SingleTask key={t.toDoId} task={t} getTasks={getTasks} />
                                  )}
                            </>
                        }
                    </tbody>
                    </table>
                      {!showComplete ?
                        <>
                          {filter !== 0 && tasks.filter(t => t.done === false && t.categoryId === filter).length === 0 &&
                            <h2 className='alert alert-warning text-dark text-center'>
                              There are no results for this category.
                            </h2>
                          }
                        </> :
                        <>
                          {filter !== 0 && tasks.filter(t => t.done && t.categoryId === filter).length === 0 && 
                            <h2 className='alert alert-warning text-dark text-center'>
                              There are no results for this category.
                              </h2>
                          }
                        </>
                      }
            </Container>
        </section>
    )
}
