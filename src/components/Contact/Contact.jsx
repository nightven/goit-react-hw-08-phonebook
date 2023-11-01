import { useDispatch } from 'react-redux';
import { deleteContact, updateContact } from 'redux/contacts/operations';

import ShowCircles from 'components/ShowCircles/ShowCircles';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Box, IconButton,  Tooltip } from '@mui/material';
import { DeleteForever, Edit, Save } from '@mui/icons-material';

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameContact, setNameContact] = useState(name);
  const [numberContact, setNumberContact] = useState(number);
  const [showEdit, setShowEdit] = useState(false);

  //! update contact function
  const handleSubmitUpdateContact = evt => {
    evt.preventDefault();
    const form = evt.target;
    const newContact = { name: nameContact, number: numberContact, id };
    form.reset();

    dispatch(updateContact(newContact)).unwrap().then().catch(() => toast.error("Can't change the contact"));
    toast.success('Contact was edited successfully');
    toggleShowEdit();
  };
  // ! delete contact
  const handleDelete = id => {
    setIsDeleting(true);
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        setIsDeleting(false);
        toast.success('Contact was deleted successfully');
      })
      .catch(() => toast.error('Could not delete a contact'));
  };
  //! toggle show edit contact function
  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  };

  //!  set state on input change
  const onChangeInput = evt => {
    if (evt.target.name === 'name') setNameContact(evt.target.value);
    if (evt.target.name === 'number') setNumberContact(evt.target.value);
  };
  return (
    <li>
      <Box
        component="div"
        sx={{
          display: 'flex',
          
          alignItems: 'center',
          border: 1,
          borderRadius: 2,
          boxShadow: 3,
          paddingLeft: '8px',
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '470px',
            height: '36px',
            marginRight:"auto"
          }}
        >
          {showEdit ? (
            <Box
              component="form"
              onSubmit={handleSubmitUpdateContact}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}
            >
              <Box component='div' sx={{display: 'flex', gap: '160px'}}>
                <Box
                  component="input"
                  type="text"
                  name="name"
                  required
                  backgroundColor="transparent"
                  value={nameContact}
                  onChange={onChangeInput}
                  border="none"
                  color="#FFFFFF"
                  fontSize="18px"
                  fontStyle="italic"
                  fontWeight="600"
                  autoFocus
                  
                />

                <Box
                  component="input"
                  type="tel"
                  name="number"
                  required
                  value={numberContact}
                  onChange={onChangeInput}
                  backgroundColor="transparent"
                  border="none"
                  color="#1f97f8"
                  fontSize="18px"
                  fontWeight="600"
                  letterSpacing='1.5'
                />
              </Box>
              <Tooltip title="Update contact" placement="left">
                <IconButton
                  aria-label="delete"
                  variant="outlined"
                  color={'info'}
                  type="submit"
                >
                  <Save />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <>
              <Box component="p" sx={{ color: '#f9f8f6', fontStyle: 'italic' }}>
                {name}
              </Box>
              <Box component="p" sx={{ color: '#1f97f8' }}>
                {number}
              </Box>
            </>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: '14px' }}>
          <Tooltip title="Edit contact" placement="left">
            <IconButton
              aria-label="edit"
              variant="outlined"
              color={'success'}
              type="button"
              onClick={() => toggleShowEdit()}
            >
              <Edit />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete" placement="top">
            <span>
              <IconButton
                aria-label="delete"
                variant="outlined"
                color="error"
                type="button"
                disabled={isDeleting}
                onClick={() => handleDelete(id)}
              >
                {isDeleting ? (
                  <ShowCircles />
                ) : (
                  <DeleteForever fontSize="inherit" />
                )}
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>

      <hr />
    </li>
  );
};
export default Contact;
