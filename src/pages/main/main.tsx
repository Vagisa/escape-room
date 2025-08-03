import GenreList from '../../components/genre-list/genre-list';
import LevelList from '../../components/level-list/level-list';
import QuestCard from '../../components/quest-card/quest-card';
import { useAppSelector } from '../../hooks';
import { selectGenre, selectLevel, selectQuests } from '../../store/selectors/quest';
import { Level, QuestGenre } from '../../utils/const';
import { getFilteredQuests } from '../../utils/utils';

function Main(): JSX.Element {
  const quests = useAppSelector(selectQuests);
  const genre = useAppSelector(selectGenre);
  const level = useAppSelector(selectLevel);

  const filteredByGenreQuests = genre === QuestGenre.All
    ? quests
    : getFilteredQuests(quests, 'type', genre);

  const filteredByLevelQuests = level === Level.Any
    ? filteredByGenreQuests
    : getFilteredQuests(filteredByGenreQuests, 'level', level);

  return (
    <main className="page-content">
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle page-content__subtitle">
            квесты в Санкт-Петербурге
          </h1>
          <h2 className="title title--size-m page-content__title">
            Выберите тематику
          </h2>
        </div>
        <div className="page-content__item">
          <form className="filter" action="#" method="get">
            <GenreList />
            <LevelList />
          </form>
        </div>
        <h2 className="title visually-hidden">Выберите квест</h2>
        <div className="cards-grid">
          {filteredByLevelQuests.map((quest) => <QuestCard quest={quest} key={quest.id} />)}
        </div>
      </div>
    </main>
  );
}

export default Main;
