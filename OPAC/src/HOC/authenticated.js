import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

const authenticated = WrappedComponent => props => {
  
    const currentUser = useSelector(state => state.user.user);
    const history = useHistory();

    useEffect(() => {
        if (currentUser.length < 1)
        {
            alert("You are not allowed here!");
            history.push("/")
        }
            
      });

    return (
        <div>
            {currentUser.length > 0 ? <WrappedComponent {...props}/> : null } 
        </div>
    );
  }
  
  export default authenticated;