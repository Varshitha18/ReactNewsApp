import React, {useEffect} from 'react';
import { MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';

const CategoryFilter = ({ onCategoryChange, selectedCategory, setCategory }) => {
  const handleCategoryChange = (event) => {
    onCategoryChange(event.target.value);
  };

  useEffect(() => {
    setCategory(selectedCategory);
  }, [selectedCategory]);

  return (
    <Box display="flex" justifyContent="center" m={2}>
    <FormControl>
      <InputLabel>Category</InputLabel>
      <Select
        value={selectedCategory}
        onChange={handleCategoryChange}
        >
        <MenuItem value="general">General</MenuItem>
        <MenuItem value="business">Business</MenuItem>
        <MenuItem value="entertainment">Entertainment</MenuItem>
        <MenuItem value="health">Health</MenuItem>
        <MenuItem value="science">Science</MenuItem>
        <MenuItem value="sports">Sports</MenuItem>
        <MenuItem value="technology">Technology</MenuItem>
      </Select>
    </FormControl>
    </Box>
  );
};

export default CategoryFilter;
