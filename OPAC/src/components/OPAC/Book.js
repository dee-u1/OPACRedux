import React, { useEffect, useState }   from 'react';
import Button from "react-bootstrap/Button"
import Form from  "react-bootstrap/Form";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { removeBook } from '../../redux/reducers/book-reducer';

const Book = (props) => {
    const [book, setBook] = useState({
            ISBN: props.book.ISBN,
            title : props.book.title,
            author: props.book.author,
            edition: props.book.edition,
            publication: props.book.publication
        }
    );
    const [isSearchResult, setIsSearchResult]=useState(props.isSearchResult);

    const currentUser = useSelector(state => state.user.user)
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.book) {
            setBook({
                ISBN: props.book.ISBN,
                title : props.book.title,
                author: props.book.author,
                edition: props.book.edition,
                publication: props.book.publication
            });
        }
    },[props.book]);
    
    const editBtnClickHandler = () => {
        props.editBook(book, book.ISBN)
    }

    const deleteBtnClickHandler = () => {
        dispatch(removeBook(book.ISBN));
    }

    const cancelBtnClickHandler = () => {
        dispatch(removeBook(book.ISBN));
    }

    const checkedHandler = (e) => {
        if (e.target.checked === true){
            props.itemChecked(book)
        }
        else{
            props.itemUnchecked(book)
        }
    }   

    return(            
        <tr>
            <td>
                { currentUser.isAdmin===false && currentUser.username.length > 0 ? <Form.Check type="checkbox" onChange={checkedHandler} label={book.ISBN} /> : book.ISBN }
            </td>
            <td>
                {book.title} 
            </td>
            <td>
                {book.author} 
            </td>
            <td>
                {book.edition} 
            </td>
            <td className="d-none d-lg-block">
                {book.publication} 
            </td>
            {currentUser.username.length > 0 && currentUser.isAdmin === true  && isSearchResult===false ?
                <td>
                    <Button variant="success" onClick={editBtnClickHandler}><AiFillEdit /></Button>{' '}
                    <Button variant="danger" onClick={deleteBtnClickHandler}><AiFillDelete /></Button>
                </td> : null
            }
            {/* {currentUser.username.length > 0 && currentUser.isAdmin === false ?
                <td>
                    <Button variant="danger" onClick={cancelBtnClickHandler}><AiFillDelete /></Button>
                </td> : null
            } */}
        </tr>
    );
}

export default Book;