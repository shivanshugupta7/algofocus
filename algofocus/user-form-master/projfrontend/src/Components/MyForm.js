import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import './myform.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function MyForm() {
    const [dob, setDob] = useState(new Date())
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [okStatus, setOkStatus] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const formOnSubmitHandler = (e) => {
        e.preventDefault();
        fetch("https://algofocususerform.herokuapp.com/user-form", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                dob
            })
        })
            .then(res => {
                setOkStatus(res.ok);
                if (res.ok === false) {
                    setErrorStatus(!res.ok)
                    setDob(Date.now())
                    setEmail("")
                    setName("")
                }
            })
            .catch(err => {
                setErrorStatus(true)
                setDob(Date.now())
                setEmail("")
                setName("")
            })
    }
    return (
        <>
            < div className="myform" >
                <Form onSubmit={formOnSubmitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Type your name here ..." className="w-100" value={name} onChange={e => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email ID</Form.Label>
                        <Form.Control type="email" placeholder="Type your name here ..." className="w-100" value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="dob">
                        <Form.Label>Date Of Birth</Form.Label><br />
                        <DatePicker selected={dob} onChange={date => setDob(date)} dateFormat="dd/MM/yyyy" className="w-100 form-control" />
                    </Form.Group>
                    {okStatus ? <Alert variant="success" dismissible onClose={() => setOkStatus(false)} className="w-100">User saved successfully</Alert> : null}
                    {errorStatus ? <Alert variant="danger" dismissible onClose={() => setErrorStatus(false)} className="w-100">Something went wrong</Alert> : null}
                    <Button type="submit" className="float-right">Submit</Button><br />
                    <h4 className="text-center text-light pl-4 mt-2 user" onClick={() => setRedirect(true)}>All user</h4>
                </Form>
                {redirect ? <Redirect to="/users" /> : null}
            </div >
        </>
    )
}

export default MyForm
