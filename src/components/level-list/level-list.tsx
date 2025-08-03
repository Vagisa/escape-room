import { nanoid } from '@reduxjs/toolkit';
import { Level } from '../../utils/const';
import LevelItem from '../level-item/level-item';

function LevelList(): JSX.Element {
  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Сложность</legend>
      <ul className="filter__list">
        {Object.values(Level).map((level) => {
          const id = nanoid();
          return (
            <LevelItem key={`${level}-${id}`} level={level} />
          );
        })}
      </ul>
    </fieldset>
  );
}

export default LevelList;
