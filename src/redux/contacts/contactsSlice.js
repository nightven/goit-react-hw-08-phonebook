import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
} from './operations';

const initialContactsState = {
  contacts: [],
  isLoading: false,
  isError: null,
};

const getActions = type =>
  isAnyOf(fetchContacts[type], addContact[type], deleteContact[type]);

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.unshift(action.payload);
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        const updatedContact = action.payload;
        const contactIndex = state.contacts.findIndex(
          contact => contact.id === updatedContact.id
        );

        if (contactIndex !== -1) {
          state.contacts[contactIndex] = updatedContact;
        };
        state.isLoading = false;
        state.isError = null;
      })
      .addMatcher(getActions('pending'), state => {
        state.isLoading = true;
      })

      .addMatcher(getActions('rejected'), (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
