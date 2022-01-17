import React from 'react';
import { useRouter } from 'next/router';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';

var generateSantas = (arr) => {
  var result = [];
  var recipients: [] = arr.slice();
  var len: number = arr.length;

  for (var i: number = 0; i < len; i++) {
    var sender: string = arr[i];
    var recipientIndex: number = Math.floor(Math.random() * recipients.length);
    while (recipients[recipientIndex] === sender) {
      recipientIndex = Math.floor(Math.random() * recipients.length);
    }
    var recipient: string = recipients.splice(recipientIndex, 1)[0];

    result.push({ recipient, sender });
  }

  return result;
};

const Display = ({ secretSantas }) => {
  // const [persons, setPersons] = useState([]);
  // const [secretSantas, setSecretSantas] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:8000/persons')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setPersons(data);
  //     });
  // }, []);
  // const segregateName = (persons) => {
  //   var arr = [];
  //   persons.map((person) => {
  //     arr.push(person.name);
  //   });
  //   const res = generateSantas(arr);
  //   return res;
  // };

  // useEffect(() => {
  //   setSecretSantas(segregateName());
  // }, [persons.length]);

  return (
    <div>
      <div>
        {secretSantas.map((data) => {
          return (
            <div>
              <div>
                {data.recipient}'s secret santa is {data.sender}
              </div>
            </div>
          );
        })}
      </div>
      <Button path='/' />
    </div>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:8000/persons');
  const persons = await res.json();
  const names = persons.map((person) => {
    return person.name;
  });

  const secretSantas = generateSantas(names);

  return {
    props: { secretSantas },
  };
}

export default Display;
{
  /* <div>
{persons.map((person) => (
  <div key={person.id}>
    <h2>{person.name}</h2>
    <button onClick={() => handleClick(person.id)}>Delete Email</button>
  </div>
))}
</div> */
}
