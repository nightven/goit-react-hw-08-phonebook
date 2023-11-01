import Contact from 'components/Contact/Contact';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, fetchContacts } from 'redux/contacts/operations';
import { useEffect, useState } from 'react';
import { setFilter } from 'redux/contacts/filterSlice';
import { getContacts, getFilter } from 'redux/contacts/selectors';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import { AddIcCall } from '@mui/icons-material';
import { selectAuthError } from 'redux/auth/selectors';
import toast from 'react-hot-toast';


export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const isError = useSelector(selectAuthError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  //! filtered contacts by name
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  //!  set state on input change
  const onChangeInput = evt => {
    if (evt.target.name === 'name') setName(evt.target.value);
    if (evt.target.name === 'number') setNumber(evt.target.value);
  };

  //! add contact function
  const handleSubmitAddContact = evt => {
    evt.preventDefault();
    const form = evt.target;
    const newContact = { name, number };
    form.reset();

    //! checking for the presence of this contact
    if (contacts.some(({ name }) => newContact.name === name)) {
      return alert(`${newContact.name} is already in contacts list`);
    }
    dispatch(addContact(newContact))
      .unwrap()
      .then(() => toast.success('Contact was added successfully'))
      .catch(() => toast.error('Could not add a contact'));
    
  };

  return (
    <>
      <h1>Phonebook</h1>
      <Box
        sx={{
          border: 1,
          borderRadius: 2,
          boxShadow: 3,
          padding: '8px',
          marginBottom: '16px',
        }}
      >
        <h2>Add contact</h2>

        <Box
          component="form"
          sx={{ display: 'flex', gap: '24px', alignItems: 'center' }}
          onSubmit={handleSubmitAddContact}
        >
          <TextField
            id="standard-basic"
            type="text"
            name="name"
            required
            sx={{ border: '2px solid #3399ff', borderRadius: 2 }}
            label="Enter name"
            size="small"
            variant="filled"
            onChange={onChangeInput}
          />

          <TextField
            id="standard-basic"
            type="tel"
            name="number"
            required
            sx={{ border: '2px solid #3399ff', borderRadius: 2 }}
            size="small"
            variant="filled"
            label="Enter number 123-45-67"
            onChange={onChangeInput}
          />

          <Tooltip title="Add contact" placement="bottom">
            <Button type="submit" variant="outlined">
              <AddIcCall /> Add contact
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ border: 1, borderRadius: 2, boxShadow: 3, padding: '8px' }}>
        <h2>Find contact by name </h2>
        <TextField
          id="standard-basic"
          type="text"
          name="filerValue"
          sx={{
            border: '2px solid #3399ff',
            borderRadius: 2,
            maxWidth: '200px',
            
          }}
          label="Filter contacts"
          size="small"
          variant="filled"
          onChange={evt => dispatch(setFilter(evt.target.value))}
        />
      </Box>
      <hr />
      {isError && (
        <div>
          Oops, something went wrong, we couldn't get the contacts. Please try
          refreshing the page.
        </div>
      )}
      {contacts.length === 0 ? (
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '40px',
            fontSize: '36px',
          }}
        >
          Contacts book is empty
        </Box>
      ) : (
        <div>
            <Box component="ul" sx={{listStyleType: 'none'}}>
            {filteredContacts?.map(({ id, name, number }) => (
              <Contact key={id} id={id} name={name} number={number} />
            ))}
          </Box>
        </div>
      )}
    </>
  );
};
