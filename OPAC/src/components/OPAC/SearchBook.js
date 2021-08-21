import React, { useEffect, useState }   from 'react';
import Button from "react-bootstrap/Button"
import { useHistory } from "react-router-dom";
import FormControl from "react-bootstrap/FormControl"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useDispatch } from 'react-redux';
import { setSearchCriteria } from '../../redux/reducers/search-reducer';

import './opac.css';

const SearchBook = (props) => {

    const [searchWord, setSearchWord]=useState('');
    const [searchOption, setSearchOption]=useState('title');
        
    const history = useHistory();
    const dispatch = useDispatch();

    const searchOptionSelectChanged = (e) => {
        setSearchOption(e.target.value);
    }

    const searchValueChanged = (e) => {
        setSearchWord(e.target.value);
    }    
    
    const btnSearchClick = () => {
        if (searchWord.trim().length > 0){
             //props.BookSearchResult(searchResult);  
             const search = {
                 word: searchWord,
                 option: searchOption
             }
             dispatch(setSearchCriteria(search));         
             history.push("/searchresult");
        }
    }

    return (
        <div>
            <div className="search-wrapper">
                <div className="search-inner">
                    <Row>
                        <Col className="searchInput" xs="auto">
                            <Form.Select aria-label="Search Option" defaultValue={'DEFAULT'} onChange={searchOptionSelectChanged} >
                                <option value="DEFAULT" disabled>Search Option</option>
                                <option value="title">Title</option>
                                <option value="author">Author</option>
                                <option value="publication">Publication</option>
                            </Form.Select>
                        </Col>
                        <Col className="searchInput">
                            <FormControl 
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                value={searchWord}
                                onChange={searchValueChanged}
                            />                            
                        </Col>
                        <Col className="searchInput" xs="auto">
                            <Button variant="success" onClick={btnSearchClick} >Search</Button>
                        </Col>
                    </Row>
                </div>
            </div>            
        </div>      
    );
}

export default SearchBook;