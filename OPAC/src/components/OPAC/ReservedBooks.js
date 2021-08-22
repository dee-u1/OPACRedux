import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Student from './Student'
import authenticated from '../../HOC/authenticated';
import { fetchStudentReservations } from '../../redux/reducers/book-reducer';
import { useDispatch, useSelector } from 'react-redux';

const ReservedBooks = (props) => {

    const books = useSelector(state => state.libro.allReservedBooks)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchStudentReservations());
    },[]);

    let reservedBooksDisplay = [];

    if (Array.isArray(books.data)) {
        reservedBooksDisplay = books.data.map(book => 
            <tr key={book.IDNum + book.ISBN}>
                <td>{book.IDNum}</td>
                <td>{book.firstName}</td>
                <td>{book.lastName}</td>
                <td>{book.ISBN}</td>
                <td>{book.title}</td>
            </tr>
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
                    </tr>
                </thead>
                <tbody>
                {reservedBooksDisplay}
                </tbody>
            </Table>
        </>
    );
}

export default authenticated(ReservedBooks);