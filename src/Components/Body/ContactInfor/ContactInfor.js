import React from 'react'
import { useParams } from 'react-router-dom'

function ContactInfor({ contacts }) {

    const { id } = useParams()

    const newList = contacts.filter(contact => contact.id === +id)

    console.log(newList)

    return (
        <div className='contactInfor'>
            {newList.map((contact) => (
                <div key={contact.id}>
                    <h1>Đây là page của {contact.name}</h1>
                    <h3>Email là: {contact.email}</h3>
                </div>
            ))}
        </div>
    )
}

export default ContactInfor
