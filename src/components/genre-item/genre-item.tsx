import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre } from '../../store/quest/quest-reducer';
import { selectGenre } from '../../store/selectors/quest';
import { GenreLabels, QuestGenre, SvgGenreWidth } from '../../utils/const';

type GenreItemProps = {
  genre: QuestGenre;
};

function GenreItem({ genre }: GenreItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedGenre = useAppSelector(selectGenre);
  const handleGenreChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeGenre(evt.target.value as QuestGenre));
  };

  return (
    <li className="filter__item">
      <input
        type="radio"
        name="type"
        id={genre}
        checked={genre === selectedGenre}
        value={genre}
        onChange={handleGenreChange}
      />
      <label className="filter__label" htmlFor={genre}>
        <svg
          className="filter__icon"
          width={SvgGenreWidth[genre]}
          height="30"
          aria-hidden="true"
        >
          <use xlinkHref={genre === QuestGenre.Adventures ? '#icon-adventure' : `#icon-${genre}`}></use>
        </svg>
        <span className="filter__label-text">{GenreLabels[genre]}</span>
      </label>
    </li>
  );
}

export default GenreItem;
