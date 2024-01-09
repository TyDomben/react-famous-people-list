import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import "./FamousSection.css";

function FamousSection() {
  let [famousPersonName, setPersonName] = useState("");
  let [famousPersonRole, setPersonRole] = useState("");
  let [famousPeopleArray, setPeopleArray] = useState([]);

  // useEffect to call fetchPeople() when the component mounts
  useEffect(() => {
    fetchPeople();
  }, []);

  // Function to fetch the list of people from the server
  const fetchPeople = () => {
    axios
      .get("/api/people")
      .then((response) => {
        setPeopleArray(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Function to handle form submission and add a new person
  const addPerson = (event) => {
    event.preventDefault();
    console.log(
      `The person is ${famousPersonName} and they're famous for ${famousPersonRole}`
    );

    // POST request to add this new person to the database
    axios
      .post("/api/people", {
        name: famousPersonName,
        role: famousPersonRole,
      })
      .then((response) => {
        setPersonName(""); // Clear the name input
        setPersonRole(""); // Clear the role input
        fetchPeople(); // Fetch the updated list
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  return (
    <section className="new-person-section">
      <form onSubmit={addPerson}>
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          value={famousPersonName}
          onChange={(event) => setPersonName(event.target.value)}
        />
        <label htmlFor="role-input">Famous for:</label>
        <input
          id="role-input"
          value={famousPersonRole}
          onChange={(event) => setPersonRole(event.target.value)}
        />
        <button type="submit">Done</button>
      </form>
      <p>
        {famousPersonName} is famous for "{famousPersonRole}".
      </p>
      <ul>
        {/* Render the list of famous people */}

        {famousPeopleArray.map((person) => {
          return (
            <li key={person.id}>
              {person.name} is famous for "{person.role}"
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FamousSection;
