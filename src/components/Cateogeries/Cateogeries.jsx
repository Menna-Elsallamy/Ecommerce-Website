import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((response) => response.data) // Assuming the data you want is in response.data
      .catch((err) => console.error(err));
  }

  async function displayCategories() {
    let {data} = await getCategories();
    console.log(data)
    setCategories(data); // Assuming the data structure matches what you expect
  }

  useEffect(() => {
    displayCategories();
  }, []);

  return (
    <div className='container'>
      <div className="row g-3 mt-2">
        {categories.map((category, index) => (
          <div key={index} className="col-md-4">
            <div className="card">
              <img src={category.image} height={300} className="card-img-top" alt={category.name} />
              <div className="card-body">
                <p className="card-text">{category.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
