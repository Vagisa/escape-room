import { Link } from 'react-router-dom';
import { QuestType } from '../../types/quest';
import { addImageSuffix } from '../../utils/utils';
import { APIRoute, BookingDate, BookingDateLabel } from '../../utils/const';
import { LocationType } from '../../types/booking';

type ReservationCardProps = {
    date: BookingDate;
    time: string;
    peopleCount: number;
    id: string;
    location: LocationType;
    quest: QuestType;
}

function ReservationCard(props: ReservationCardProps): JSX.Element {
  const {
    id,
    title,
    previewImg,
    previewImgWebp,
    level
  } = props.quest;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${previewImgWebp}, ${addImageSuffix(previewImgWebp)} 2x`}
          />
          <img
            src={previewImg}
            srcSet={`${addImageSuffix(previewImg)} 2x`}
            width="344"
            height="232"
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${APIRoute.Quest}${id}`}>
            {title}
          </Link>
          <span className="quest-card__info">
            [{BookingDateLabel[props.date]},&nbsp;{props.time}. {props.location.address}]
          </span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>
            {props.peopleCount}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>
            {level}
          </li>
        </ul>
        <button
          className="btn btn--accent btn--secondary quest-card__btn"
          type="button"
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

export default ReservationCard;
