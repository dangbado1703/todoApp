import React from 'react'
import { useNavigate } from 'react-router-dom'

function EditContact({ handleUpdate, editting, setEditting }) {

    const navigate = useNavigate()

    const handleSubmitForm = (e) => {
        e.preventDefault()
        handleUpdate(editting)
        navigate('/')
    }
    return (
        <form onSubmit={handleSubmitForm}>
            <div className='name'>
                <span>Name:</span>
                <input
                    type='text'
                    value={editting.name}
                    onChange={e => setEditting({
                        ...editting,
                        name: e.target.value
                    })}
                />
            </div>
            <div className='email'>
                <span>Email:</span>
                <input
                    type='text'
                    value={editting.email}
                    onChange={e => setEditting({
                        ...editting,
                        email: e.target.value
                    })}
                />
            </div>
            <button>Update</button>
        </form>
    )
}

export default EditContact
