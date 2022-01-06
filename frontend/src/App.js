import axios from 'axios'
import { useState, useEffect} from 'react'

const App = () => {

    const [contact, setContact] = useState({
        name: '',
        descr: '',
        number: ''
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

    const submitHandler = (e) => {
        e.preventDefault()
        const { name, descr, number } = contact
        const newContact = { name, descr, number }
        axios.post('http://localhost:5000/newContact', newContact)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
        console.log(newContact)

    }


    return (
        <>
            <div className="container mt-5 pt-5">
                <div className="row">
                    <div className="col-lg-6 mx-auto">
                        <form onSubmit={e => e.preventDefault()}>
                            <input
                                type="text"
                                className="form-control mb-4"
                                placeholder='Enter your name'
                                name='name'
                                onChange={handleChange}
                                value={contact.name}
                            />

                            <input
                                type="text"
                                className="form-control mb-4"
                                placeholder='Enter description'
                                name='descr'
                                onChange={handleChange}
                                value={contact.descr}
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
                </div>
            </div>
        </>
    )
}

export default App
