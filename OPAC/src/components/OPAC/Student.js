import React  from 'react';

const Student = (props) => {

    return(            
        <tr>
            <td>
                {props.student.IDNum} 
            </td>
            <td>
                {props.student.firstName} 
            </td>
            <td>
                {props.student.lastName} 
            </td>
            <td className="d-none d-lg-block">
                {props.student.userName} 
            </td>
        </tr>
    );
}

export default Student;