import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import Header from './components/Header';
import ArticleList from './components/ArticleList';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      mode: 'light',
    },
  });

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('general');

  const apiKey = 'ddbbc5d647d349ab83ebb05b916da4df';

  const fetchNews = async (query = '', selectedCategory = 'general') => {
    setLoading(true);
    try {
      const url = query
        ? `https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`
        : `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&apiKey=${apiKey}`;
      
      const response = await axios.get(url);
      console.log(response);
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [category]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    setCategory('general');
    fetchNews(query, category);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setSearchTerm('');
    fetchNews(searchTerm, selectedCategory);
  };

  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Header />
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      <CategoryFilter onCategoryChange={handleCategoryChange} selectedCategory={category} setCategory={setCategory}/>
      {loading ? (
        <CircularProgress />
      ) : (
        <ArticleList articles={articles} />
      )}
    </Container>
  </ThemeProvider>
  );
};

export default App;
