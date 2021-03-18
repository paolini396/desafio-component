import { useEffect, useState } from 'react';

import { api } from '../services/api';

import { Button } from './Button';
import '../styles/sidebar.scss';

interface SideBarProps {
  handleClick(id: number): void;
  selectedGenreId: number;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  
  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          id={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => props.handleClick(genre.id)}
          selected={props.selectedGenreId === genre.id}
        />
      ))}
    </div>

  </nav>
  )
}