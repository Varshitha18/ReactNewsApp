const NEWS_API_KEY = "ddbbc5d647d349ab83ebb05b916da4df"

export const getArticles = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`
    );
    const json = await response.json();
    return json;
  };
  
  export const getQueryArticles = async topic => {
    console.log(topic)
    console.log('hiiii')
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${topic}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`
    );
    const json = await response.json();
    return json;
  };