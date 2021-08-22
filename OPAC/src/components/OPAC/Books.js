import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import AddEditBook from './AddEditBook';
import Book from './Book'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../redux/reducers/book-reducer';
import authenticated from '../../HOC/authenticated';

const Books = (props) => {
    const [showDataEntry, setShowDataEntry]=useState(false);
    const [editItem, setEditItem]=useState(null);
    
    const mgaLibro = useSelector(state => state.libro.books)
    const currentUser = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchBooks());
    },[showDataEntry]);

    const displayDataEntry = () =>{
        setEditItem(null);
        setShowDataEntry(true);
    }
    
    const handleClose = (e) => {
        setShowDataEntry(e);
    };
    
    const editBook = (book, ISBN) => {
        setEditItem(book);
        setShowDataEntry(true);
    }

    let booksDisplay = [];

    if (Array.isArray(mgaLibro.data)) {
        booksDisplay = mgaLibro.data.map(book => 
            <Book 
                key={book.ISBN} 
                book={book} 
                editBook={editBook}
                isSearchResult={false}
            />)
    }
    
    return (
        <>
            {showDataEntry ?
                <AddEditBook show={showDataEntry} handleClose={handleClose} editItem={editItem} /> : ''
            }
            <div className="row">
                <div className="col-md-9"><h1 className="page-header">Books</h1></div>
                <div className="col-md-3"><h1 className="page-header">
                    {currentUser.username.length > 0 && currentUser.isAdmin === true  ? 
                    <button type="button" onClick={displayDataEntry} className="btn btn-success" >Add New Entry</button> : null }                    
                    </h1></div>
            </div>
            <Table responsive variant="light">
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Edition</th>
                        <th className="d-none d-lg-block">Publication</th>
                        {currentUser.username.length > 0 && currentUser.isAdmin === true ? <th>Action</th> : null }
                    </tr>
                </thead>
                <tbody>
                {booksDisplay}
                </tbody>
            </Table>
        </>
    );
}

export default authenticated(Books);