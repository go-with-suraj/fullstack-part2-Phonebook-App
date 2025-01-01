import { useEffect, useState } from 'react'

import './App.css'
import Name from './components/Name'
import { PersonForm } from './components/PersonForm'
import { Search } from './components/Search'
import axios from 'axios'
import personService from './services/persons'



function App() {
const [persons, setPersons] = useState([])
const [searchQuery, setSearchQuery] = useState('')


useEffect(() => {
  personService
  .getAll()
  .then(initialPersons => {
    setPersons(initialPersons)
  })
}, [])


const addName = (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const getName = formData.get('name')
  const getNumber = formData.get('number')
  
  if(!getName || !getNumber) {
    alert('Please fill in both name and number')
    return
  }

  if(getNumber.length !== 10 || isNaN(getNumber)) {
    alert('Phone number must contain exactly 10 digits.')
    return
  }

  
    const nameExits = persons.find((person) => person.name.toLowerCase() === getName.toLowerCase())

    if(nameExits) {
      if(window.confirm(`The person ${getName} already exists. Do you want to update the phone number?`) ) {
        const updatePerson = {
          ...nameExits,
          number: getNumber
        }

        personService
        .update(nameExits.id, updatePerson)
        .then(updatePerson => {
          setPersons(persons.map(person => 
            person.id !== updatePerson.id ? person : updatePerson 
          ))
        })

        .catch(error => {
          console.log('Error updating person:', error)
          alert('Failed to update phone number. Please try again later.')
        })
      }
    }
    else {
      const newPerson = {
        name: getName,
        number: getNumber
      }
  
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons((prev) => [...prev, returnedPerson])
        setSearchQuery('')
      })
      .catch((error) => {
        console.error('Error adding person:', error)
        alert('Failed to add person. Please try again later')
      })
      
    } 
  e.target.reset()
}

const deletePerson = id => {
  const person = persons.find(person => person.id === id)
if (window.confirm(`Delete ${person.name}`)) {
  personService
  .deletePerson(person.id)
  .then( () => {
    setPersons((prevPersons) => prevPersons.filter((person) => person.id !== id))
  })
  .catch(error => {
    alert(`The entry for ${person.name} could not be deleted. It might already be removed.`)
  })
}
}

const filteredPersons = persons.filter((person => 
  person.name.toLowerCase().includes(searchQuery.toLowerCase())
))

  return (
<>
   <h2>Phonebook</h2>
    
    <PersonForm addName={addName}/>
   
   <h2>Search</h2>

    <Search 
    searchQuery = {searchQuery} 
    setSearchQuery = {setSearchQuery} 
    />

   <h2>Names</h2>
   <ul>
    {filteredPersons.map((person) =>
      <Name
      name ={person.name} 
      number = {person.number}
      key={person.id}
      deletePerson = {() => deletePerson(person.id)}
      
      /> 
    )}
   </ul>   
</>
  )
}

export default App
