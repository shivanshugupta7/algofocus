import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

function Users() {
    const [users, setUsers] = useState([])
    const [back, setBack] = useState(false)
    useEffect(() => {
        fetch("https://algofocususerform.herokuapp.com/users", {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => setUsers(res))
            .catch(err => console.log(err))
    }, [])
    return (

        <>
            <Button className="m-3" onClick={() => setBack(true)}>Back</Button><br />
            {
                users.map((user, index) => {
                    return <Card className="w-25 m-3 shadow-lg text-center text-break float-left" key={index}>
                        <Card.Body>Name: {user.name}<br /> Email: {user.email}<br />DOB: {user.dob.substring(0, 10).split('-').reverse().join('/')}</Card.Body>
                    </Card>
                })
            }
            {back ? <Redirect to="/" /> : null}
        </>
    )
}

export default Users