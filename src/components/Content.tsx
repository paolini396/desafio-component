import { useEffect, useState } from "react";

import { api } from '../services/api';

import { MovieCard } from './MovieCard';
import { Header } from './Header';

import '../styles/content.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface ContentProps {
  selectedGenre: GenreResponseProps;
  selectedGenreId: number;
}

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`)
      .then(response => {
        setMovies(response.data);
      });
  },[props.selectedGenreId])

  return (
    <div className="container">
      <Header title={props.selectedGenre.title} />
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard 
              title={movie.Title} 
              poster={movie.Poster} 
              runtime={movie.Runtime} 
              rating={movie.Ratings[0].Value} 
            />
          ))}
        </div>
      </main>
    </div>
  )
}