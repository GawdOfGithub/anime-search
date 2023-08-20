import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Card, CardMedia, CardContent, Grid } from '@mui/material';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor: '#f5f5f5', // Default background color
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    borderRadius: 8,
    display: 'flex',
  },
  media: {
    width: '40%', // Adjust the width to your preference
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px 0 0 8px',
  },
  content: {
    width: '60%', // Adjust the width to your preference
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  synopsis: {
    fontSize: '1rem',
  },
  error: {
    backgroundColor: '#ffcccb', // Background color for error state
  },
  noData: {
    backgroundColor: '#b0e57c', // Background color when data is not available
  },
};

function Anime({ query, setQuery }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Set initial loading state to false
  const [error, setError] = useState(null);
  const [URL, setURL] = useState('');

  useEffect(() => {
    if (query.length >= 4) {
      setLoading(true); // Start loading when the query length is greater than or equal to three
      fetch(`https://api.jikan.moe/v4/anime?q=${query}&sfw`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          console.log(data);

          const imageUrl = data?.data[1]?.images?.jpg?.image_url; // Use optional chaining to access the image URL
          if (imageUrl) {
            setURL(imageUrl);
          } else {
            // If the image URL is not available, you can set a default image.
            setURL("URL_TO_DEFAULT_IMAGE");
          }
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
    } else {
      // Reset data and URL when query length is less than four
      setData(null);
      setURL('');
    }
  }, [query]);

  if (loading) {
    return (
      <Box style={{ ...styles.root, ...styles.noData }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={{ ...styles.root, ...styles.error }}>
        <div>Error: {error.message}</div>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box style={{ ...styles.root, ...styles.noData }}>
        <div>Data not available.</div>
      </Box>
    );
  }

  return (
    <Box style={styles.root}>
      <Card style={styles.card}>
        <CardMedia
          style={styles.media}
          component="img"
          image={URL || "URL_TO_DEFAULT_IMAGE"}
          alt="Anime Poster"
        />
        <CardContent style={styles.content}>
          <Typography style={styles.title} gutterBottom variant="h5" component="h1">
            {query}
          </Typography>
          <Typography style={styles.synopsis} variant="body1" component="p">
            {data?.data[1]?.synopsis}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Anime;
