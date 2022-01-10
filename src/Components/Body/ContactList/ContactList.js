import React, { useRef } from 'react'
import './ContactList.css'
import { Link } from 'react-router-dom'

function ContactList({ contacts, handleDelete, handleEdit, search, setSearch }) {

    const inputEle = useRef('')

    const getSearch = () => {
        setSearch(inputEle.current.value)
    }

    return (
        <div className='contactList'>
            <div className='contacts'>
                <div className='title'>
                    <h1>List Contact:</h1>
                    <Link to="/add"><h3>Go to AddList</h3></Link>
                </div>
                <div className='search'>
                    <input
                        ref={inputEle}
                        value={search}
                        onChange={getSearch}
                        placeholder='Search Here'
                    />
                    <i className="fas fa-search"></i>
                </div>
                {contacts.map((contact) => (
                    <div className='contact' key={contact.id}>
                        <Link to={{ pathname: `contacts/${contact.id}` }}>
                            <p><i className="far fa-user"></i></p>
                        </Link>
                        <div className='infor'>
                            <p>Name: {contact.name}</p>
                            <p>Email: {contact.email}</p>
                        </div>
                        <p>
                            <i
                                onClick={() => handleDelete(contact.id)}
                                className="far fa-trash-alt"></i>
                        </p>
                        <Link to={{ pathname: `edit/${contact.id}` }}>
                            <p><i
                                onClick={() => handleEdit(contact)}
                                className="far fa-edit"></i></p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ContactList
