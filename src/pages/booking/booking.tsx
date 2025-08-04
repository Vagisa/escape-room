import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  fetchQuestAction,
  fetchBookingInfoAction,
  postBookingAction,
} from '../../store/api-actions';
import { resetQuestData } from '../../store/booking/booking-reducer';
import {
  selectBookingPageLoading,
  selectBookings,
} from '../../store/selectors/user';
import { selectQuest } from '../../store/selectors/booking';
import Map from '../../components/map/map';
import LoadingScreen from '../loading-screen/loading-screen';
import { BookingInfoType } from '../../types/booking';
import { BookingDate } from '../../utils/const';

function Booking(): JSX.Element {
  const { id } = useParams();

  const bookings = useAppSelector(selectBookings);
  const bookingPageIsLoading = useAppSelector(selectBookingPageLoading);
  const quest = useAppSelector(selectQuest);

  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<BookingInfoType | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [contactPerson, setContactPerson] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [withChildren, setWithChildren] = useState<boolean>(false);
  const [peopleCount, setPeopleCount] = useState<number>(0);

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

  useEffect(() => {
    if (bookings.length > 0) {
      setSelectedPlace(bookings[0]);
    }
  }, [bookings]);

  if (
    !quest ||
    bookings.length === 0 ||
    bookingPageIsLoading ||
    !selectedPlace
  ) {
    return <LoadingScreen />;
  }

  const handlePlaceClick = (place: BookingInfoType) => {
    setSelectedPlace(place);
  };

  const handleDateTimeChange = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleContactPersonChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContactPerson(evt.target.value);
  };

  const handlePhoneChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(evt.target.value);
  };

  const handlePeopleCountChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPeopleCount(Number(evt.target.value));
  };

  const handleWithChildrenChange = (
    evt: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWithChildren(evt.target.checked);
  };

  const handleAgreementChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgreementChecked(evt.target.checked);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      postBookingAction({
        questId: quest.id,
        bookingUserData: {
          placeId: selectedPlace.id,
          date: selectedDate as BookingDate,
          time: selectedTime,
          contactPerson: contactPerson,
          phone: phone,
          peopleCount: peopleCount,
          withChildren: withChildren,
        },
      })
    );
  };

  return (
    <main className="page-content decorated-page">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet={`${quest.previewImgWebp}, ${quest.coverImgWebp} 2x`}
          />
          <img
            src={quest.previewImg}
            srcSet={`${quest.coverImg} 2x`}
            width="1366"
            height="1959"
            alt={quest.title}
          />
        </picture>
      </div>
      <div className="container container--size-s">
        <div className="page-content__title-wrapper">
          <h1 className="subtitle subtitle--size-l page-content__subtitle">
            Бронирование квеста
          </h1>
          <p className="title title--size-m title--uppercase page-content__title">
            {quest.title}
          </p>
        </div>
        <div className="page-content__item">
          <div className="booking-map">
            <Map
              selectedPlace={selectedPlace}
              places={bookings}
              onPlaceClick={handlePlaceClick}
            />
            <p className="booking-map__address">
              Вы&nbsp;выбрали: {selectedPlace.location.address}
            </p>
          </div>
        </div>
        <form
          className="booking-form"
          action="https://echo.htmlacademy.ru/"
          method="post"
          onSubmit={handleSubmit}
        >
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Выбор даты и времени</legend>
            {selectedPlace.slots.today.length > 0 && (
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Сегодня</legend>
                <div className="booking-form__date-inner-wrapper">
                  {selectedPlace.slots.today.map((slot) => (
                    <label
                      className="custom-radio booking-form__date"
                      key={slot.time}
                    >
                      <input
                        type="radio"
                        id={slot.time}
                        name="date"
                        disabled={!slot.isAvailable}
                        required
                        value={slot.time}
                        onChange={() =>
                          handleDateTimeChange('today', slot.time)}
                      />
                      <span className="custom-radio__label">{slot.time}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            {selectedPlace.slots.tomorrow.length > 0 && (
              <fieldset className="booking-form__date-section">
                <legend className="booking-form__date-title">Завтра</legend>
                <div className="booking-form__date-inner-wrapper">
                  {selectedPlace.slots.today.map((slot) => (
                    <label
                      className="custom-radio booking-form__date"
                      key={slot.time}
                    >
                      <input
                        type="radio"
                        id={slot.time}
                        name="date"
                        disabled={!slot.isAvailable}
                        required
                        value={slot.time}
                        onChange={() =>
                          handleDateTimeChange('tomorrow', slot.time)}
                      />
                      <span className="custom-radio__label">{slot.time}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
          </fieldset>
          <fieldset className="booking-form__section">
            <legend className="visually-hidden">Контактная информация</legend>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="name">
                Ваше имя
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Имя"
                required
                pattern="[А-Яа-яЁёA-Za-z'\\- ]{1,}"
                value={contactPerson}
                onChange={handleContactPersonChange}
              />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">
                Контактный телефон
              </label>
              <input
                type="tel"
                id="tel"
                name="tel"
                placeholder="Телефон"
                required
                pattern="^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$"
                value={phone}
                onChange={handlePhoneChange}
              />
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">
                Количество участников
              </label>
              <input
                type="number"
                id="person"
                name="person"
                placeholder="Количество участников"
                required
                value={peopleCount}
                onChange={handlePeopleCountChange}
              />
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input
                type="checkbox"
                id="children"
                name="children"
                checked={withChildren}
                onChange={handleWithChildrenChange}
              />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">
                Со&nbsp;мной будут дети
              </span>
            </label>
          </fieldset>
          <button
            className="btn btn--accent btn--cta booking-form__submit"
            type="submit"
          >
            Забронировать
          </button>
          <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
            <input
              type="checkbox"
              id="id-order-agreement"
              name="user-agreement"
              checked={isAgreementChecked}
              required
              onChange={handleAgreementChange}
            />
            <span className="custom-checkbox__icon">
              <svg width="20" height="17" aria-hidden="true">
                <use xlinkHref="#icon-tick"></use>
              </svg>
            </span>
            <span className="custom-checkbox__label">
              Я&nbsp;согласен с
              <a className="link link--active-silver link--underlined" href="#">
                правилами обработки персональных данных
              </a>
              &nbsp;и пользовательским соглашением
            </span>
          </label>
        </form>
      </div>
    </main>
  );
}

export default Booking;
