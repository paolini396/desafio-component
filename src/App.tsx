import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content, GenreResponseProps } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

   return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar 
        selectedGenreId={selectedGenreId} 
        handleClick={handleClickButton}
      />
      <Content 
        selectedGenreId={selectedGenreId} 
        selectedGenre={selectedGenre} 
      />
    </div>
  )
}