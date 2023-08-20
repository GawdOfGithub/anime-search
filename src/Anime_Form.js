import React from 'react';
import { TextField, Grid, Box } from '@mui/material';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  textField: {
    width: '90%', // Increase the width as needed
    maxWidth: 500, // Set a maximum width for the TextField
    marginBottom: 10,
  },
};

export default function Anime_Form({ query, setQuery }) {
  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <Box mt={5} display="flex" justifyContent="center">
      <Grid item xs={12} sm={6}>
        <div style={styles.root}>
          <TextField
            label="Anime name"
            variant="outlined"
            value={query}
            onChange={handleChange}
            style={styles.textField}
          />
        </div>
      </Grid>
    </Box>
  );
}
