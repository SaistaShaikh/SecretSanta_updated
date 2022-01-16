import Form from '../components/Form';
import React, { useState, useEffect } from 'react';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState<string>('');
  const [arr, setArr] = useState([]);

  var pair = (arr) => {
    var result = [];

    var recipients: [] = arr.slice();
    var len: number = arr.length;

    for (var i: number = 0; i < len; i++) {
      var sender: string = arr[i];
      var recipientIndex: number = Math.floor(
        Math.random() * recipients.length
      );
      while (recipients[recipientIndex] === sender) {
        recipientIndex = Math.floor(Math.random() * recipients.length);
      }
      var recipient: string = recipients.splice(recipientIndex, 1)[0];

      result.push(recipient, sender);
    }

    return result;
  };

  const fun = () => {
    var arr = [];
    persons.map((person) => {
      arr.push(person.name);
    });
    pair(arr);
  };

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

  useEffect(() => {
    fetch('http://localhost:8000/persons')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPersons(data);
      });
  }, []);

  useEffect(() => {
    fun();
  }, [persons]);

  return (
    <div>
      <div>{persons && <Form persons={persons} setPersons={setPersons} />}</div>
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
      <Button path='./main/display' />
    </div>
  );
};

export default HomePage;
