import React, {useEffect} from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = ({ onSearch, searchTerm }) => {
  const [inputValue, setInputValue] = React.useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(inputValue);
  };

  return (
    <div>
    <Box display="flex" justifyContent="center" m={2} >
      <TextField
        label="Search for news"
        value={inputValue}
        onChange={handleInputChange}
        variant="outlined"
        />
      <Button onClick={handleSearchClick} variant="contained" color="primary">
        Search
      </Button>
    </Box>
    </div>
  );
};

export default SearchBar;
