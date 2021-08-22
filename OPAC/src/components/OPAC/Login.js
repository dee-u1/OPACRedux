import React, {useState} from "react";
import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

import { useHistory } from "react-router-dom";
import { setUser, checkUser } from '../../redux/reducers/user-reducer';
import { checkStudentAccount, setStudentData } from "../../redux/reducers/student-reducer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Login = (props) => {
    const [show, setShow] = useState(props.show);
    const [loginData, setLoginData] = useState({
            username: '',
            password: ''
        }
    )
    const [optionSelected, setOptionSelected]=useState('admin');
    const history = useHistory();
    const dispatch = useDispatch();

    const inputChangeHandler = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name] : e.target.value
        });
    }

    const fetchOneUser = async params => {
        try {
            const resultAction = await dispatch(checkUser(params));
            //const user = resultAction.payload;
            const user = {
                username: resultAction.payload,
                isAdmin: true
            };
            if (user.username.trim().length < 1)
                alert("Invalid username or password");
            else{
                dispatch(setUser(user));
                history.push("/");
            }
        } catch (err) {
          alert(`Fetch failed: ${err.message}`);
        }
      }


      const fetchStudentAccount = async params => {
        try {
            const resultAction = await dispatch(checkStudentAccount(params));
            const response = resultAction.payload;
            const user = {
                username: response.firstName + ' ' + response.lastName,
                isAdmin: false
            };

            if (user.username.trim().length < 1)
                alert("Invalid username or password");
            else{
                dispatch(setUser(user));
                dispatch(setStudentData(response));
                history.push("/");
            }
            
        } catch (err) {
          alert(`Fetch failed: ${err.message}`);
        }
      }

    const btnClickHandler = () => {
        const params = {
            username: loginData.username,
            password: loginData.password
            };

        //dispatch(checkUser(params));
        if (optionSelected === "admin")
            fetchOneUser(params);
        else
            fetchStudentAccount(params);
    }

    const handleClose = () => {
        setShow(false);
        props.handleClose(false);
        history.push("/");
    };

    const onChangeValue = (event) => {
        setOptionSelected(event.target.value);
    }

    return (
        <>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log-in</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                <Form.Group className="mb-3" onChange={onChangeValue}>
                    <input
                        id="admin"
                        value="admin"
                        name="option"
                        type="radio"    
                        defaultChecked
                    />
                    &nbsp; Admin&nbsp; &nbsp; 
                    <input
                        id="student"
                        value="student"
                        name="option"
                        type="radio"
                    />
                    &nbsp; Student
                </Form.Group>
                <Form.Group className="mb-3"> 
                    <label htmlFor="username">Username:</label>
                    <input 
                        name="username"
                        type="text" 
                        className="form-control" 
                        placeholder="Enter username" 
                        value={loginData.username}
                        onChange={inputChangeHandler} 
                    />
                </Form.Group>
                <Form.Group className="mb-3">  
                    <label htmlFor="author">Password:</label>
                    <input 
                        name="password"
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        value={loginData.password}
                        onChange={inputChangeHandler} 
                    />
                 </Form.Group>                
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >Close</Button>
                    <Button variant="primary" onClick={btnClickHandler}>Ok</Button>
                </Modal.Footer>
            </Modal>         
        </>
    );
}

export default Login;