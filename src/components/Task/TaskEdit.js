import React from 'react'
import Modal from 'react-bootstrap/Modal'
import TaskForm from './TaskForm'

export default function TaskEdit(props) {
  return (
    <Modal
      show={props.showEdit}
      onHide={() => props.setShowEdit(false)}
      size='lg'>
        <Modal.Header className='bg-info' closeButton>
          <h3>Edit {props.task.name}</h3>
        </Modal.Header>
        <Modal.Body>
          <TaskForm 
            setShowEdit={props.setShowEdit}
            getTasks={props.getTasks}
            task={props.task} />
        </Modal.Body>
    </Modal>
  )
}
