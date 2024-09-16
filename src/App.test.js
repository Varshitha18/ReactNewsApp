import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import axios from 'axios'
import React from 'react';

test('display title', () => {
  render(<App />);
  const linkElement = screen.getByText("News App");
  expect(linkElement).toBeInTheDocument();
});



jest.mock('axios');

test('fetches and displays articles by parsing the objects', async() => {
  const mockArticles = [
    {
      title: 'Article title',
      urlToImage: 'https://articles.com/image.jpeg',
      url: 'https://articles.com/article'
    },
    {
      title: 'Article title2',
      urlToImage: 'https://articles.com/image2.jpeg',
      url: 'https://articles.com/article2'
    },
  ];
  axios.get.mockResolvedValue({data: {articles:mockArticles}});

  render(<App/>);

  await waitFor(() => {
    expect(screen.getByText('Article title')).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByText('Article title2')).toBeInTheDocument();
  });

  const images = screen.getAllByRole('img');
  await waitFor(() => {
    expect(images[1]).toHaveAttribute('src', 'https://articles.com/image2.jpeg');
  })
  await waitFor(() => {
    expect(images[0]).toHaveAttribute('src', 'https://articles.com/image.jpeg');
  })

  const buttons = screen.getAllByRole('link', {name: "Read More"});
  await waitFor(() => {
    expect(buttons[1]).toHaveAttribute('href', 'https://articles.com/article2');
  })
  await waitFor(() => {
    expect(buttons[0]).toHaveAttribute('href', 'https://articles.com/article');
  })

})


test('search term included in api call', async() => {
  const mockArticles = [
    {
      title: 'Article title',
      urlToImage: 'https://articles.com/image.jpeg',
      url: 'https://articles.com/article'
    },
    {
      title: 'Article title2',
      urlToImage: 'https://articles.com/image2.jpeg',
      url: 'https://articles.com/article2'
    }]

    axios.get.mockResolvedValue({data: {articles:mockArticles}});

    render(<App/>);

    const searchInput = screen.getByLabelText(/search/i)
    const searchButton = screen.getByRole('button', {name: /search/i})
    fireEvent.change(searchInput, {target: {value: 'mongolia'}})
    fireEvent.click(searchButton)

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('q=mongolia'));
    })

})


test('category included in api call', async() => {
  const mockArticles = [
    {
      title: 'Article title',
      urlToImage: 'https://articles.com/image.jpeg',
      url: 'https://articles.com/article'
    },
    {
      title: 'Article title2',
      urlToImage: 'https://articles.com/image2.jpeg',
      url: 'https://articles.com/article2'
    }]

    axios.get.mockResolvedValue({data: {articles:mockArticles}});

    render(<App/>);

    const category = screen.getByDisplayValue(/general/i)
    fireEvent.change(category, {target: {value: 'sports'}})

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('category=sports'));
    })

})