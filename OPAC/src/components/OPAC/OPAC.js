import React, { useState, useEffect }   from 'react';
import Books from './Books';
import Students from './Students';
import Login from './Login';
import SearchBook from './SearchBook';
import SearchResult from './SearchResult';
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import AddEditStudent from './AddEditStudent';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './opac.css';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser, setUser } from '../../redux/reducers/user-reducer';
import { useHistory } from "react-router-dom";
import { addStudent } from '../../redux/reducers/student-reducer';

//by Rodelio M. Rodriguez

const OPAC = (props) => {

    const [searchResult, setSearchResult] = useState([]);
    const [showDataEntry, setShowDataEntry]=useState(false);
    
    const history = useHistory();
    let currentUser = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    
    const setBookSearchResult = (data) => {
        setSearchResult(data);
    }
   
    const handleClose = (e) => {
        setShowDataEntry(e);
    };

    const addNewStudent = (student) => {
        dispatch(addStudent(student));
    }

    const logoutHandler = () => {
        dispatch(logoutUser());
    }

    return (
        <Router>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" >
                <Container>
                <Navbar.Brand as={Link} to="/">Online Public Access Catalogue</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">                       
                        {currentUser.length > 0 ?
                            <Nav>
                            <Nav.Link as={Link} to='/books'>Books</Nav.Link> 
                            <Nav.Link as={Link} to='/students'>Students</Nav.Link> 
                            </Nav>
                            : ''
                        }
                    </Nav>
                    {currentUser.length > 0 ?
                        <Nav>
                            <Nav.Link as={Link} to="/" onClick={logoutHandler}>Log-out</Nav.Link>
                        </Nav> :
                        <Nav>
                            <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            <Nav.Link as={Link} to="/login">Log-in</Nav.Link>                            
                        </Nav>
                    }
                </Navbar.Collapse>
                </Container>
            </Navbar>
            <Switch>
            <Route path="/books">
                <Books />
            </Route>
            <Route path="/students">
                <Students />
            </Route>
            <Route path="/login">
                <Login show={true} handleClose={handleClose} />
            </Route>
            <Route path="/searchresult">
                <SearchResult searchBooks={searchResult} />
            </Route>
            <Route path="/register">
                <AddEditStudent show={true} handleClose={handleClose} addStudent={addNewStudent} />
            </Route>
            <Route path="/">
                <SearchBook BookSearchResult={setBookSearchResult} />
            </Route>
            </Switch>
        </Router>            
    );
}

export default OPAC;