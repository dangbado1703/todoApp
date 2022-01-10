import './App.css';
import { Routes, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import ContactList from './Components/Body/ContactList/ContactList';
import AddContact from './Components/Body/Addlist/AddContact';
import API from './Components/API/API';
import ContactInfor from './Components/Body/ContactInfor/ContactInfor';
import EditContact from './Components/Body/EditContact/EditContact';

function App() {

  const [contacts, setContacts] = useState([])

  const [addContacts, setAddContacts] = useState({
    name: '',
    email: ''
  })

  const [editting, setEditting] = useState({
    name: '',
    email: ''
  })

  const [searchContacts, setSearchContacts] = useState('')

  const [searchResult, setSearchResult] = useState([])

  const handleAddContacts = async (contact) => {
    const request = {
      id: '',
      ...contact
    }
    const reponse = await API.post('/contacts', request)
    setContacts([...contacts, reponse.data])
    setAddContacts({
      name: '',
      email: ''
    })
  }

  const handleDelete = async (id) => {
    await API.delete(`/contacts/${id}`)
    const newList = contacts.filter(contact => id !== contact.id)
    setContacts(newList)
  }

  useEffect(() => {
    const getApi = async () => {
      const response = await API.get('/contacts')
      return response.data
    }
    const getContacts = async () => {
      const allContacts = await getApi()
      if (allContacts) setContacts(allContacts)
    }
    getContacts()
  }, [])

  const handleEdit = (contact) => {
    setEditting({
      id: contact.id,
      name: contact.name,
      email: contact.email
    })
  }

  const handleUpdate = async (contact) => {
    const response = await API.put(`/contacts/${contact.id}`, contact)
    const { id } = response.data
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact
      })
    )
  }

  const handleSearch = (searchContacts) => {
    setSearchContacts(searchContacts)
    if (searchContacts !== '') {
      const newList = contacts.filter((contact) => {
        console.log(Object.values(contact))
        return Object.values(contact)
          .join('')
          .toLowerCase()
          .includes(searchContacts.toLowerCase())
      })
      setSearchResult(newList)
    }
    else setSearchResult(contacts)
  }

  return (
    <div className="App">
      <div className='body'>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchContacts.length < 1 ? contacts : searchResult}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                search={searchContacts}
                setSearch={handleSearch}
              />
            }
          />
          <Route
            path='/add'
            element={
              <AddContact addContacts={addContacts}
                setAddContacts={setAddContacts}
                handleAddContacts={handleAddContacts}
              />
            }
          />
          <Route
            path='/add'
            element={
              <AddContact addContacts={addContacts}
                setAddContacts={setAddContacts}
                handleAddContacts={handleAddContacts}
              />
            }
          />
          <Route
            path='/edit/:id'
            element={
              <EditContact
                contacts={contacts}
                editting={editting}
                setEditting={setEditting}
                handleUpdate={handleUpdate}
                handleEdit={handleEdit}
              />
            }
          />
          <Route
            path='/contacts/:id'
            element={<ContactInfor
              contacts={contacts}
            />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
