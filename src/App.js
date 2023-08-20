import React, { useState } from 'react';
import AnimeForm from './Anime_Form'; // Corrected component name
import Anime from './Anime';

export default function App() {
  const [query, setQuery] = useState("Naruto"); // Used useState directly

  return (
    <div>
   <AnimeForm query={query} setQuery={setQuery} /> {/* Corrected component name */}
      <Anime query={query} setQuery={setQuery} />
    </div>
  );
}
