import axios from 'axios'
import { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

    const [contact, setContact] = useState({
        name: '',
        descr: '',
        number: ''
    })

    const [contacts, setContacts] = useState({
        name: '',
        descr: '',
        number: '',
        _id: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setContact(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const getContacts = () => {
        fetch('http://localhost:5000/contacts')
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })

            .then((result) => {
                console.log(result)
                setContacts(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const { name, descr, number } = contact
        const newContact = { name, descr, number }
        axios.post('http://localhost:5000/newContact', newContact)
        setContact({
            name: '',
            descr: '',
            number: ''
        })
        toast.success('Contact added successfully')
        console.log(newContact)
        getContacts()
    }

    const deleteContact = (id) => {
        axios.delete('http://localhost:5000/delete/' + id)
        getContacts()
    }


    useEffect(() => {
        getContacts()
    }, [])


    return (
        <>
            <ToastContainer />
            <div className="container mt-5 p-lg-5">
                <div className="row">
                    <div className="col-lg-6 shadow mx-auto p-5">
                        <form className='py-lg-4' onSubmit={e => e.preventDefault()}>
                            <input
                                type="text"
                                className="form-control mb-4"
                                placeholder='Enter your name'
                                name='name'
                                onChange={handleChange}
                                value={contact.name}
                            />

                            <textarea
                                name='descr'
                                onChange={handleChange}
                                value={contact.descr}
                                className='form-control mb-4'
                                style={{ height: '150px' }}
                                placeholder='Enter description'
                            />

                            <input
                                type="number"
                                className="form-control mb-4"
                                placeholder='Enter your number'
                                name='number'
                                onChange={handleChange}
                                value={contact.number}
                            />

                            <button
                                className="btn btn-outline-dark d-block ml-auto"
                                onClick={submitHandler}
                            >
                                Send me
                            </button>
                        </form>
                    </div>

                    <div className="col-12 overflow-auto mt-5">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Phone number</th>
                                    <th className="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.length > 0 ? contacts.map((item, index) => {
                                    return (
                                        <tr key={item._id}>
                                            <th>{index + 1}</th>
                                            <th>{item.name}</th>
                                            <th>{item.descr}</th>
                                            <th><a href={`tel: ${item.number}`}>{item.number}</a></th>
                                            <th>
                                                <button
                                                    // onClick={() => updateContact(item._id)}
                                                    className="btn btn-outline-warning mx-2">Update</button>
                                                <button
                                                    onClick={() => deleteContact(item._id)}
                                                    className="btn btn-outline-danger">Delete</button>
                                            </th>
                                        </tr>

                                    )
                                }) : null}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default App
