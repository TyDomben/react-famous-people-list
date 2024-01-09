import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FamousSection.css';

function FamousSection() {
  let [famousPersonName, setPersonName] = useState('');
  let [famousPersonRole, setPersonRole] = useState('');
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // On Load, do this thing
  useEffect(() => {
    console.log('in useEffect')
    fetchPeople();
  }, []);

  // GET request
  const fetchPeople = () => {
    axios.get('/people').then((response) => {
      console.log('this is the response from fetchPeople', response.data);

      // take the data from the response and assign it to the famousPeopleArray

    })
  }

  const addPerson = (evt) => {
    evt.preventDefault();
    console.log( `The person is ${famousPersonName} and they're famous for ${famousPersonRole}` );
    
    // create POST request to add this new person to the database
    
    // HINT: you will have to create a new object containing the famousPersonName and famousPersonRole values
    // the keys should be 'name' and 'role'
  
  }

    return (
      <section className="new-person-section">
        <form onSubmit={addPerson}>
          <label htmlFor="name-input">Name:</label>
          <input id="name-input" onChange={e => setPersonName(e.target.value)} />
          <label htmlFor="role-input">Famous for:</label>
          <input id="role-input" onChange={e => setPersonRole(e.target.value)} />
          <button type="submit">Done</button>
        </form>
        <p>
          {famousPersonName} is famous for "{famousPersonRole}".
        </p>
        <ul>
          {/* The list should go here. */}
        </ul>
      </section>
    );
}

export default FamousSection;
