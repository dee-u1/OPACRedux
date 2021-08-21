import React, { useEffect } from 'react';
import Button from "react-bootstrap/Button"
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addBook, updateBook } from '../../redux/reducers/book-reducer';

const AddEditBook = (props) => {
    const [show, setShow] = useState(props.show);
    const [book, setBook] = useState({
            ISBN: '',
            title : '',
            author: '',
            edition: '',
            publication: ''
        }
    );
    const [isInEdit, setEditMode] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.editItem) {
            setEditMode(true);
            setBook({
                ISBN: props.editItem.ISBN,
                title : props.editItem.title,
                author: props.editItem.author,
                edition: props.editItem.edition,
                publication: props.editItem.publication
            });
        }
    },[props.editItem]);

    const handleClose = () => {
        setShow(false);
        props.handleClose(false);
    };

    const handleShow = () => setShow(true);

    
    const clearInputs = () => {
        setBook({
            ISBN: '',
            title : '',
            author: '',
            edition: '',
            publication: ''
        })
    }

    const addItem = (e) => {
        let newItem = book;
        clearInputs(); 
        dispatch(addBook(newItem));
        props.handleClose(false);
    }

    const updateItem = (e) => {
        let newItem = {
            ISBN: book.ISBN,
            title : book.title,
            author: book.author,
            edition: book.edition,
            publication: book.publication
        }            
        //props.saveUpdate(newItem);
        dispatch(updateBook(newItem));
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
                    <Modal.Title>{isInEdit ? 'Update Book' : 'Add New Book'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                    <label htmlFor="ISBN">ISBN:</label>
                    {   isInEdit  ?
                        <input 
                            type="text"
                            name="ISBN"
                            value={book.ISBN}
                            readOnly='readOnly'
                            onChange={inputChangeHandler}
                            className="form-control"
                        /> : 
                        <input 
                            type="text"
                            name="ISBN"
                            value={book.ISBN}
                            onChange={inputChangeHandler}
                            className="form-control"
                        />
                    }
                </div>
                <div className="form-group">       
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text"
                        name="title"
                        value={book.title}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </div>
                <div className="form-group">       
                    <label htmlFor="author">Author:</label>
                    <input 
                        type="text"
                        name="author"
                        value={book.author}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </div>
                <div className="form-group">       
                    <label htmlFor="edition">Edition:</label>
                    <input 
                        type="text"
                        name="edition"
                        value={book.edition}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </div>
                <div className="form-group">       
                    <label htmlFor="publication">Publication:</label>
                    <input 
                        type="text"
                        name="publication"
                        value={book.publication}
                        onChange={inputChangeHandler} 
                        className="form-control"
                    />
                </div>             
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >Close</Button>
                    <Button variant="primary" onClick={btnClickHandler}>Save</Button>
                </Modal.Footer>
            </Modal>           
        </>
    )
}

export default AddEditBook