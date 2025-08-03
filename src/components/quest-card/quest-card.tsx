import { Link } from 'react-router-dom';
import { QuestType } from '../../types/quest';
import { addImageSuffix } from '../../utils/utils';
import { APIRoute } from '../../utils/const';

type QuestCardProps = {
  quest: QuestType;
}

function QuestCard({ quest }: QuestCardProps): JSX.Element {
  const {
    id,
    title,
    previewImg,
    previewImgWebp,
    level,
    peopleMinMax: [peopleMin, peopleMax],
  } = quest;

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
        </div>
        <ul className="tags quest-card__tags">
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
      </div>
    </div>
  );
}

export default QuestCard;
