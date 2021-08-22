import React, { useEffect } from 'react';
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Modal from 'react-bootstrap/Modal'
import { useHistory } from "react-router-dom";

import {useState} from 'react';

const AddEditStudent = (props) => {
    const [show, setShow] = useState(props.show);
    const [book, setBook] = useState({
            IDNum: '',
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            confirmpassword: ''
        }
    );
    const [isInEdit, setEditMode] = useState(false);
    
    const history = useHistory();

    useEffect(() => {
        if (props.editItem) {
            setEditMode(true);
            setBook({
                IDNum: props.editItem.IDNum,
                firstName : props.editItem.firstName,
                lastName : props.editItem.lastName,
                userName : props.editItem.userName,
                password : props.editItem.password,
                confirmpassword: props.editItem.confirmpassword
            });
        }
    },[props.editItem]);

    const handleClose = () => {
        setShow(false);
        props.handleClose(false);
        history.push("/");
    };

    const handleShow = () => setShow(true);

    const addItem = (e) => {
        let newItem = book;
        props.addStudent(newItem);
        clearInputs(); 
        props.handleClose(false);
        setShow(false);
        history.push("/");
    }

    const clearInputs = () => {
        setBook({
            IDNum: '',
            firstName: '',
            lastName: '',
            userName: '',
            password: '',
            confirmpassword: ''
        })
    }

    const updateItem = (e) => {
        let newItem = {
            IDNum: book.IDNum,
            firstName: book.firstName,
            lastName: book.lastName,
            userName: book.userName,
            password: book.password,
            confirmpassword: book.confirmpassword
        }            
        props.saveUpdate(newItem);
        clearInputs();
        setEditMode(false);
        props.handleClose(false);
    }

    const btnClickHandler = () => {
        if (isInEdit) {
            updateItem();
        }
        else {
            addItem();
        }
    }

    const inputChangeHandler = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    }

    return(
        <> 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isInEdit ? 'Update Student Data' : 'Add New Student'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group className="mb-3">      
                    <label htmlFor="IDNum">ID No.:</label>
                    {   isInEdit  ?
                        <input 
                            type="text"
                            name="IDNum"
                            value={book.IDNum}
                            readonly='readonly'
                            onChange={inputChangeHandler}
                            className="form-control"
                        /> : 
                        <input 
                            type="text"
                            name="IDNum"
                            value={book.IDNum}
                            onChange={inputChangeHandler}
                            className="form-control"
                        />
                    }
                </Form.Group> 
                <Form.Group className="mb-3">       
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text"
                        name="firstName"
                        value={book.firstName}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3">       
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text"
                        name="lastName"
                        value={book.lastName}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3">        
                    <label htmlFor="userName">Username:</label>
                    <input 
                        type="text"
                        name="userName"
                        value={book.userName}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3">       
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password"
                        name="password"
                        value={book.password}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </Form.Group>
                <Form.Group className="mb-3">    
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input 
                        type="password"
                        name="confirmpassword"
                        value={book.confirmpassword}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </Form.Group>            
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >Close</Button>
                    <Button variant="primary" onClick={btnClickHandler}>Save</Button>
                </Modal.Footer>
            </Modal>           
        </>
    )
}

export default AddEditStudent