import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await axios.get('/students');
  return response.data;
});

export const addStudent = createAsyncThunk('students/addStudent', async (student) => {
  const newStudent = {
        IDNum: student.IDNum,
        firstName: student.firstName,
        lastName: student.lastName,
        userName: student.userName,
        password: student.password,
  };

  const response = await axios.post('/students', newStudent);
    return response.data;
});

export const studentSlice = createSlice({
  name: 'students',
  initialState: {
    students: []
  },
  reducers: {
    // fetchBooks: (state, action) => {
    //   state.books = action.payload;
    // }
  },
  extraReducers: {
    [fetchStudents.pending]: (state, action) => {
      //alert('pending!');
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.students = action.payload;
    },
    [fetchStudents.error]: (state, action) => {
      alert("Failed to get Students");
    },
  }
});

export default studentSlice.reducer;