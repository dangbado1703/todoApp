import React from 'react'
import './AddContact.css'
import { useNavigate } from 'react-router-dom'

function AddContact({ addContacts, setAddContacts, handleAddContacts }) {

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (addContacts.name === '' && addContacts.email === '') alert('Nhập thông tin đi bro')
        else {
            handleAddContacts(addContacts)
            navigate('/')
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='name'>
                <span>Name:</span>
                <input
                    type='text'
                    value={addContacts.name}
                    onChange={e => setAddContacts({
                        ...addContacts,
                        name: e.target.value
                    })}
                />
            </div>
            <div className='email'>
                <span>Email:</span>
                <input
                    type='text'
                    value={addContacts.email}
                    onChange={e => setAddContacts({
                        ...addContacts,
                        email: e.target.value
                    })}
                />
            </div>
            <button>Add</button>
        </form>
    )
}

export default AddContact
