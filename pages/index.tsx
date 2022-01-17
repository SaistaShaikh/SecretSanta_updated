import Form from '../components/Form';
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';
import { json } from 'stream/consumers';

const HomePage: React.FC = (props: any) => {
  const [persons, setPersons] = useState(props.persons);
  const [name, setName] = useState('');
  const [arr, setArr] = useState([]);
  // var result = [];

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = { name };
    fetch('http://localhost:8000/persons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then((person) => {
        setPersons([...persons, person]);
      });
  };

  // useEffect(() => {
  //   fetch('http://localhost:8000/persons')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setPersons(data);
  //     });
  // }, []);

  // useEffect(() => {
  //   setArr(fun());
  // }, [persons]);

  useEffect(() => {
    console.log(arr);
  }, [arr]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <button>Add</button>
        </form>
      </div>
      <div>{persons && <Form persons={persons} setPersons={setPersons} />}</div>

      <Button path='./main/display' />
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:8000/persons');
  const persons = await res.json();
  return {
    props: { persons },
  };
}

export default HomePage;
