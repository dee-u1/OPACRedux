import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/esm/Button';
import { useSelector, useDispatch } from 'react-redux';
import Book from './Book';
import { addNewReservations, fetchBooks, fetchAvailableBooks } from '../../redux/reducers/book-reducer';
import { useHistory } from "react-router-dom";
import './opac.css';

const SearchResult = (props) => {

    const currentUser = useSelector(state => state.user.user)
    const searchWord = useSelector(state => state.search.word)
    const searchOption = useSelector(state => state.search.option)
    const [selection, setSelection] = useState([]);

    const books = useSelector(state => state.libro.books);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=> {
        dispatch(fetchAvailableBooks());
    },[]);

    const itemChecked = (book) => {        
        let selectionCopy = [...selection];                
        selectionCopy.push(book);    
        setSelection(selectionCopy);
    }

    const itemUnchecked = (book) =>{
        let selectionCopy = [...selection];
        let index = selectionCopy.findIndex(item => item === book);
        selectionCopy.splice(index,1);
        setSelection(selectionCopy);
    }

    let newSelections = [];
    let currentIDNum = useSelector(state => state.students.IDNum);
    let currentFirstName = useSelector(state => state.students.firstName);
    let currentLastName = useSelector(state => state.students.lastName);
    
    const myFunction=(item, index) => {
        const book = {
            IDNum: currentIDNum,
            firstName: currentFirstName,
            lastName: currentLastName,
            ISBN : item.ISBN, 
            title: item.title
        }
        newSelections.push(book);
    }

    const btnSubmitClickHandler = () => {

        if (selection.length < 1){
            alert("Please make a selection first.");
            return;
        }

        const params = {
            books: selection
        };

        selection.forEach(myFunction);
        
        dispatch(addNewReservations(newSelections));
        history.push("/reservations");
    }

    let booksDisplay = [];
    if (Array.isArray(books.data)) {
        let searchResult = books.data.filter(item => item[searchOption].toLowerCase().indexOf(searchWord) > -1);   
        
        booksDisplay = searchResult.map(book => 
        <Book 
            key={book.ISBN} 
            book={book}
            itemChecked={itemChecked}
            itemUnchecked={itemUnchecked}
            isSearchResult={true}
        />)
    }
    
    return (
        <>
           
            <div className="row">
                <div className="col-md-9"><h1 className="page-header">Books containing '{searchWord}' in {searchOption}</h1></div>
            </div>
            <Table responsive variant="light">
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Edition</th>
                        <th className="d-none d-lg-block">Publication</th>
                        {currentUser.length > 0 ? <th>Action</th> : null }
                    </tr>
                </thead>
                <tbody>
                {booksDisplay}
                </tbody>
            </Table>
            { currentUser.isAdmin===false && currentUser.username.length > 0 ?
            <Button variant="primary" onClick={btnSubmitClickHandler}>Submit selection</Button>
            : null }
        </>      
    );
}

export default SearchResult;