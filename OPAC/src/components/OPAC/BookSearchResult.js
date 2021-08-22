import React, { useEffect, useState }   from 'react';
import Button from "react-bootstrap/Button"
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { cancelReservedBook } from '../../redux/reducers/book-reducer';

const BookSearchResult = (props) => {
    const [book, setBook] = useState({
            ISBN: props.book.ISBN,
            title : props.book.title,
            author: props.book.author,
            edition: props.book.edition,
            publication: props.book.publication
        }
    );
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

    let currentIDNum = useSelector(state => state.students.IDNum);
    let currentFirstName = useSelector(state => state.students.firstName);
    let currentLastName = useSelector(state => state.students.lastName);

    const cancelBtnClickHandler = () => {
        // dispatch(removeBook(book.ISBN));
        //alert(book.ISBN);
        const bookToCancel = {
            ISBN: book.ISBN,
            IDNum: currentIDNum
        };

        dispatch(cancelReservedBook(bookToCancel));
        // alert(ISBN);
     }

    return(            
        <tr >
            <td>{currentIDNum}</td>
            <td>{currentFirstName}</td>
            <td>{currentLastName}</td>
            <td>{book.ISBN}</td>
            <td>{book.title}</td>
            <td><Button variant="danger" onClick={cancelBtnClickHandler}><AiFillDelete /></Button></td>
        </tr>
    );
}

export default BookSearchResult;