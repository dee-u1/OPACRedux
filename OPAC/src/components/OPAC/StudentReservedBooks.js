import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import authenticated from '../../HOC/authenticated';
import Button from "react-bootstrap/Button"
import Form from  "react-bootstrap/Form";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentReservationsInvididual, cancelReservedBook } from '../../redux/reducers/book-reducer';
import BookSearchResult from './BookSearchResult';

const StudentReservedBooks = (props) => {

    const books = useSelector(state => state.libro.allReservedBooks)
    let currentStudent = useSelector(state => state.students.IDNum);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchStudentReservationsInvididual(currentStudent));
    },[]);

    let reservedBooksDisplay = [];

    if (Array.isArray(books.data)) {
        reservedBooksDisplay = books.data.map(book => 
            <BookSearchResult key={book.IDNum + book.ISBN} book={book} />
    )};
    
    return (
        <>
            <div className="row">
                <div className="col-md-12"><h1 className="page-header">Book Reservations</h1></div>
            </div>
            <Table responsive variant="light">
                <thead>
                    <tr>
                        <th>ID No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Action</th> 
                    </tr>
                </thead>
                <tbody>
                {reservedBooksDisplay}
                </tbody>
            </Table>
        </>
    );
}

export default StudentReservedBooks;