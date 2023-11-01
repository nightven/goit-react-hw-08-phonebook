import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// GET @ /contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.massage);
    }
  }
);


// POST @ /contact
export const addContact = createAsyncThunk(
    'contacts/contact',
    async (contact, thunkAPI) => {
      try {
        const response = await axios.post('/contacts',  contact );
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );

  // DELETE @ /contact/:id
export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
      try {
        const response = await axios.delete(`/contacts/${contactId}`);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );


    // update @ /contact/:id , contact
export const updateContact = createAsyncThunk(
    'contacts/updateContact',
    async ({ name,  number, id}, thunkAPI) => {
      try {
        const response = await axios.patch(`/contacts/${id}`, {name, number});
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );