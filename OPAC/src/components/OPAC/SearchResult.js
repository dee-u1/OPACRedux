import React, { useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import { useSelector, useDispatch } from 'react-redux';
import Book from './Book';
import { fetchBooks } from '../../redux/reducers/book-reducer';
import './opac.css';

const SearchResult = (props) => {

    const currentUser = useSelector(state => state.user.user)
    const searchWord = useSelector(state => state.search.word)
    const searchOption = useSelector(state => state.search.option)

    const books = useSelector(state => state.libro.books);
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(fetchBooks());
    },[]);

    let booksDisplay = [];
    if (Array.isArray(books.data)) {
        let searchResult = books.data.filter(item => item[searchOption].toLowerCase().indexOf(searchWord) > -1);   
        
        booksDisplay = searchResult.map(book => 
        <Book 
            key={book.ISBN} 
            book={book} 
        />)
    }
    
    return (
        <>
           
            <div className="row">
                <div className="col-md-9"><h1 className="page-header">Books containing '{searchWord}' in {searchOption}</h1></div>
            </div>
            <Table responsive variant="light">
                <thead>
                    <tr>
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Edition</th>
                        <th className="d-none d-lg-block">Publication</th>
                        {currentUser.length > 0 ? <th>Action</th> : null }
                    </tr>
                </thead>
                <tbody>
                {booksDisplay}
                </tbody>
            </Table>
        </>      
    );
}

export default SearchResult;