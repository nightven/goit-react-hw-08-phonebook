import { ContactsList } from 'components/ContactList/ContactList';
import { StyledContainer } from './Phonebook.styled';

const Phonebook = () => {
  return (
    <StyledContainer>
      <ContactsList />
    </StyledContainer>
  );
};

export default Phonebook;
