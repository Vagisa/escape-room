import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeLevel } from '../../store/quest/quest-reducer';
import { selectLevel } from '../../store/selectors/quest';
import { Level, LevelLabels } from '../../utils/const';

type LevelItemProps = {
  level: Level;
};

function LevelItem({ level }: LevelItemProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedLevel = useAppSelector(selectLevel);
  const handleLevelChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeLevel(evt.target.value as Level));
  };

  return (
    <li className="filter__item">
      <input
        type="radio"
        name="level"
        id={level}
        checked={level === selectedLevel}
        value={level}
        onChange={handleLevelChange}
      />
      <label className="filter__label" htmlFor={level}>
        <span className="filter__label-text">{LevelLabels[level]}</span>
      </label>
    </li>
  );
}

export default LevelItem;
