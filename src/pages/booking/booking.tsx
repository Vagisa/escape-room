import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
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

type FormData = {
  date: string;
  contactPerson: string;
  phone: string;
  peopleCount: number;
  withChildren: boolean;
  agreement: boolean;
};

function Booking(): JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();

  const bookings = useAppSelector(selectBookings);
  const bookingPageIsLoading = useAppSelector(selectBookingPageLoading);
  const quest = useAppSelector(selectQuest);

  const [selectedPlace, setSelectedPlace] = useState<BookingInfoType | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      contactPerson: '',
      phone: '',
      peopleCount: quest?.peopleMinMax[0] || 1,
      withChildren: false,
      agreement: false,
    },
  });

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
    setValue('date', `${date}-${time}`);
  };

  const onSubmit = async (data: FormData): Promise<void> => {
    if (!selectedPlace || !selectedDate || !selectedTime) {
      toast.error('Пожалуйста, выберите место и время');
      return;
    }

    try {
      await dispatch(
        postBookingAction({
          questId: quest.id,
          bookingUserData: {
            placeId: selectedPlace.id,
            date: selectedDate as BookingDate,
            time: selectedTime,
            contactPerson: data.contactPerson,
            phone: data.phone,
            peopleCount: data.peopleCount,
            withChildren: data.withChildren,
          },
        })
      ).unwrap();

      toast.success('Бронирование успешно создано!');
      navigate('/my-quests');
    } catch (error) {
      toast.error('Произошла ошибка при создании бронирования');
    }
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
          onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
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
                  {selectedPlace.slots.tomorrow.map((slot) => (
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
                placeholder="Имя"
                {...register('contactPerson', {
                  required: 'Имя обязательно для заполнения',
                  minLength: {
                    value: 1,
                    message: 'Имя должно содержать минимум 1 символ',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Имя должно содержать максимум 15 символов',
                  },
                  pattern: {
                    value: /^[А-Яа-яЁёA-Za-z'\s-]+$/,
                    message: 'Имя может содержать только буквы, пробелы, апострофы и дефисы',
                  },
                })}
              />
              {errors.contactPerson && (
                <span className="custom-input__error">
                  {errors.contactPerson.message}
                </span>
              )}
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="tel">
                Контактный телефон
              </label>
              <input
                type="tel"
                id="tel"
                placeholder="+7 (000) 000-00-00"
                {...register('phone', {
                  required: 'Номер телефона обязателен для заполнения',
                  pattern: {
                    value: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                    message: 'Введите номер в формате +7 (000) 000-00-00',
                  },
                })}
              />
              {errors.phone && (
                <span className="custom-input__error">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="custom-input booking-form__input">
              <label className="custom-input__label" htmlFor="person">
                Количество участников
              </label>
              <input
                type="number"
                id="person"
                placeholder="Количество участников"
                {...register('peopleCount', {
                  required: 'Количество участников обязательно для заполнения',
                  min: {
                    value: quest.peopleMinMax[0],
                    message: `Минимальное количество участников: ${quest.peopleMinMax[0]}`,
                  },
                  max: {
                    value: quest.peopleMinMax[1],
                    message: `Максимальное количество участников: ${quest.peopleMinMax[1]}`,
                  },
                  valueAsNumber: true,
                })}
              />
              {errors.peopleCount && (
                <span className="custom-input__error">
                  {errors.peopleCount.message}
                </span>
              )}
              <span className="custom-input__helper">
                Доступно: {quest.peopleMinMax[0]}-{quest.peopleMinMax[1]} участников
              </span>
            </div>
            <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
              <input
                type="checkbox"
                id="children"
                {...register('withChildren')}
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
              {...register('agreement', {
                required: 'Необходимо согласиться с условиями',
              })}
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
          {errors.agreement && (
            <span className="custom-input__error">
              {errors.agreement.message}
            </span>
          )}
        </form>
      </div>
    </main>
  );
}

export default Booking;
