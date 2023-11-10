import React from 'react'
import Container from 'react-bootstrap/Container'
import axios from 'axios'

export default function Categories() {
  return (
    <section className="categories">
      <article className="bg p-5">
        <h1 className="text-center">Task Categories</h1>
      </article>
      <Container>
      <table className="table bg table-dark my3">
        <thead className="table-secondary text-uppercase">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
          
        </tbody>
      </table>
    </Container>
    </section>
  )
}
