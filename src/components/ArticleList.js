import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const ArticleList = ({ articles }) => {
    return (
      <Grid container spacing={3}>
        {articles.map((article, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card style={{ height: '350px', width: '100%' }}>
              {article.urlToImage && <CardMedia
                component="img"
                height="140"
                image={article.urlToImage}
                alt={article.title}
                style={{ objectFit: 'cover' }}
              />}
              <CardContent style={{ height: '110px', overflow: 'hidden' }}>
                <Typography variant="h6">
                  {article.title}
                </Typography>
              </CardContent>
              <CardActions>
                <Button href={article.url} target="_blank" size="small" color="primary">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

export default ArticleList;
