import React, {useState} from "react";
import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button';
import { useHistory } from "react-router-dom";
import { setUser, checkUser } from '../../redux/reducers/user-reducer';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Login = (props) => {
    const [show, setShow] = useState(props.show);
    const [loginData, setLoginData] = useState({
            username: '',
            password: ''
        }
    )

    //const { user, loading, error } = useSelector(state => state.user)

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
            const user = resultAction.payload;
            dispatch(setUser(user));
            history.push("/");
            //setShow(false);
            //alert(`Fetched ${user}`);
        } catch (err) {
          alert(`Fetch failed: ${err.message}`);
        }
      }

    const btnClickHandler = () => {
        const params = {
            username: loginData.username,
            password: loginData.password
            };
        
        // axios.get('/checkuser', { params } )
        // .then(function(response) {              
        //     if (response.data.length > 0){
        //         alert("Credentials found");
        //         dispatch(setUser(response.data));            
        //         history.push("/");
        //     }
        //     else{
        //         alert("Wrong username or password");
        //     }
        // }).catch(function(error) {
        //     console.log('Error on Authentication');
        //     alert("error");
        // });

        dispatch(checkUser(params));
        fetchOneUser(params);

        // dispatch(checkUser(params)).then(() => {
        //     // do additional work
        //     alert('here!');
        //   })

        // try {
        // const resultAction = await dispatch(checkUser(params));
        // const user = unwrapResult(resultAction)
        // showToast('success', `Fetched ${user.name}`)
        // } catch (err) {
        // showToast('error', `Fetch failed: ${err.message}`)
        // }



        // if (loginData.username==="test" && loginData.password==="test"){
        //     dispatch(setUser('rodelio'));
        //     props.adminLogin(true);
        //     alert("Credentials found");
        //     history.push("/");
        //     setShow(false);
        // }
        // else{
        //     alert("Wrong username or password");
        // }
    }

    const handleClose = () => {
        setShow(false);
        props.handleClose(false);
        history.push("/");
    };

    return (
        <>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Log-in</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                
                <div className="form-group">       
                    <label htmlFor="username">Username:</label>
                    <input 
                        name="username"
                        type="text" 
                        className="form-control" 
                        placeholder="Enter username" 
                        value={loginData.username}
                        onChange={inputChangeHandler} 
                    />
                </div>
                <div className="form-group">       
                    <label htmlFor="author">Password:</label>
                    <input 
                        name="password"
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        value={loginData.password}
                        onChange={inputChangeHandler} 
                    />
                </div>                         
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