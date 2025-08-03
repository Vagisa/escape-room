import { nanoid } from '@reduxjs/toolkit';
import { QuestGenre } from '../../utils/const';
import GenreItem from '../genre-item/genre-item';

function GenreList(): JSX.Element {
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Тематика</legend>
      <ul className="filter__list">
        {Object.values(QuestGenre).map((genre) => {
          const id = nanoid();
          return (
            <GenreItem key={`${genre}-${id}`} genre={genre} />
          );
        })}
      </ul>
    </fieldset>
  );
}

export default GenreList;
