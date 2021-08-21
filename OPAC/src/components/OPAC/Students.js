import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Student from './Student'
import authenticated from '../../HOC/authenticated';
import { fetchStudents } from '../../redux/reducers/student-reducer';
import { useDispatch, useSelector } from 'react-redux';

const Students = (props) => {

    const students = useSelector(state => state.students.students)
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchStudents());
    },[]);

    let studentsDisplay = [];

    if (Array.isArray(students.data)) {
        studentsDisplay = students.data.map(student => 
            <Student 
                key={student.IDNum} 
                student={student} 
            />)
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12"><h1 className="page-header">Students</h1></div>
            </div>
            <Table responsive variant="light">
                <thead>
                    <tr>
                        <th>ID No.</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                {studentsDisplay}
                </tbody>
            </Table>
        </>
    );
}

export default authenticated(Students);