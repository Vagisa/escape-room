import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectQuest, selectQuestPageLoading } from '../../store/selectors/booking';
import { useEffect } from 'react';
import { fetchBookingInfoAction, fetchQuestAction } from '../../store/api-actions';
import { resetQuestData } from '../../store/booking/booking-reducer';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFound from '../not-found/not-found';
import { AppRoute } from '../../utils/const';

function Quest(): JSX.Element {
  const quest = useAppSelector(selectQuest);
  const questPageIsLoading = useAppSelector(selectQuestPageLoading);

  const { id } = useParams();

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchQuestAction(id));
      dispatch(fetchBookingInfoAction(id));
    }

    return () => {
      dispatch(resetQuestData());
    };
  }, [dispatch, id]);

  if (questPageIsLoading) {
    return <LoadingScreen />;
  }

  if (!quest) {
    return <NotFound />;
  }

  const {
    title,
    previewImg,
    previewImgWebp,
    level,
    type,
    peopleMinMax: [peopleMin, peopleMax],
    description,
    coverImg,
    coverImgWebp,
  } = quest;

  return (
    <main className="decorated-page quest-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${coverImgWebp} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${coverImg} 2x`}
            width="1366"
            height="768"
            alt={title}
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="quest-page__content">
          <h1 className="title title--size-l title--uppercase quest-page__title">
            {title}
          </h1>
          <p className="subtitle quest-page__subtitle">
            <span className="visually-hidden">Жанр:</span>{type}
          </p>
          <ul className="tags tags--size-l quest-page__tags">
            <li className="tags__item">
              <svg width="11" height="14" aria-hidden="true">
                <use xlinkHref="#icon-person"></use>
              </svg>
              {peopleMin}&ndash;{peopleMax}&nbsp;чел
            </li>
            <li className="tags__item">
              <svg width="14" height="14" aria-hidden="true">
                <use xlinkHref="#icon-level"></use>
              </svg>
              {level}
            </li>
          </ul>
          <p className="quest-page__description">
            {description}
          </p>
          <Link
            className="btn btn--accent btn--cta quest-page__btn"
            to={AppRoute.Booking}
          >
            Забронировать
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Quest;
