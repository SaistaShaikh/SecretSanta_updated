import React, { useState } from 'react';

const Form = ({ persons, setPersons }) => {
  const handleClick = (id) => {
    fetch('http://localhost:8000/persons/' + id, {
      method: 'DELETE',
    }).then(() => {
      const newPersons = persons.filter((person) => {
        if (person.id !== id) {
          return person;
        }
      });
      setPersons(newPersons);
      console.log('deleted');
    });
  };
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <h2>{person.name}</h2>
          <button onClick={() => handleClick(person.id)}>Delete Email</button>
        </div>
      ))}
    </div>
  );
};

export default Form;
//   var people: string[];
//   people = ['oreo', 'pistu', 'shaista', 'camel', 'lion'];

//   var pair = function (arr) {
//     var result = [];
//     var recipients: [] = arr.slice();
//     var len: number = arr.length;
//     for (var i: number = 0; i < len; i++) {
//       var sender: string = arr[i];
//       var recipientIndex: number = Math.floor(
//         Math.random() * recipients.length
//       );
//       while (recipients[recipientIndex] === sender) {
//         recipientIndex = Math.floor(Math.random() * recipients.length);
//       }
//       var recipient: string = recipients.splice(recipientIndex, 1)[0];
//       result.push({
//         santa: sender,
//         receiver: recipient,
//       });
//     }
//     return result;
//   };

//   console.log(pair(people));
