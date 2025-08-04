import { useEffect } from 'react';
import { fetchReservationAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { resetUserReservations } from '../../store/user/user-reducer';
import { selectReservations } from '../../store/selectors/user';
import ReservationCard from '../../components/reservation-card/reservation-card';

function MyQuests(): JSX.Element {
  const reservations = useAppSelector(selectReservations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReservationAction());

    return () => {
      dispatch(resetUserReservations());
    };
  }, [dispatch]);
  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-bg-size-m.jpg"
            srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x"
            width="1366"
            height="1959"
            alt=""
          />
        </picture>
      </div>
      <div className="container">
        <div className="page-content__title-wrapper">
          <h1 className="title title--size-m page-content__title">
            Мои бронирования
          </h1>
        </div>
        <div className="cards-grid">
          {reservations.map((reservation) =>(
            <ReservationCard
              key={reservation.id}
              {...reservation}
            />))}
        </div>
      </div>
    </main>
  );
}

export default MyQuests;
