import React from 'react'
import TaskForm from './TaskForm'

export default function TaskCreate(props) {
  return (
    <article className="createTask m-2 text-white justify-content-center">
      <TaskForm setShowCreate={props.setShowCreate} getTasks={props.getTasks} />
    </article>
  )
}
