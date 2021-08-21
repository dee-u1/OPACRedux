import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get('/books');
  return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const newBook = {
      ISBN: book.ISBN,
      title : book.title,
      author: book.author,
      edition: book.edition,
      publication: book.publication
  };
  const response = await axios.post('/books', newBook);
    return response.data;
});

export const removeBook = createAsyncThunk('books/remove', async (ISBN) => {
  const response = await axios.delete(`/books/${ISBN}`);
  return response.data;
});

export const updateBook = createAsyncThunk('book/updateBook', async (book) => {
  const response = await axios.put(`/books/${book.ISBN}`, book)
  return response.data;
});

export const bookSlice = createSlice({
  name: 'libro',
  initialState: {
    books: []
  },
  reducers: {
    // fetchBooks: (state, action) => {
    //   state.books = action.payload;
    // }
  },
  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      //alert('pending!');
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
    [fetchBooks.error]: (state, action) => {
      alert("Failed to get Books");
    },
    [addBook.fulfilled]: (state, action) => {
      state.books = action.payload;
        //state.books = [action.payload.data, ...state.books];
    },
    [addBook.rejected]: (state, action) => {
      alert("Error on adding books");
    },
    [removeBook.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
    [removeBook.rejected]: (state, action) => {
      alert("Error on deleting book");
    },
    [updateBook.fulfilled]: (state, action) => {
      state.books = action.payload;
    },
    [updateBook.rejected]: (state, action) => {
      alert("Error updating book");
    }
  }
});

export default bookSlice.reducer;