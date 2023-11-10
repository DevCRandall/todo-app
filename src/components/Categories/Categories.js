import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import SingleCategory from './SingleCategory';

export default function Categories() {

  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get(`http://todoapi.devchristopherrandall.com/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  useEffect(() => {
    getCategories()
  }, []);

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
          {/* READ UI */}
          {categories.map(c =>
            <SingleCategory key={c.categoryId} category={c} getCategories= {getCategories} />
          )}
        </tbody>
      </table>
    </Container>
    </section>
  )
}
