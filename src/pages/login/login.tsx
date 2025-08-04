import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/auth';
import { Navigate } from 'react-router-dom';
import { AppRoute, PasswordLength } from '../../utils/const';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

type FormData = {
  email: string;
  password: string;
};

function Login(): JSX.Element {
  const userIsAuth = useAuth();
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  if (userIsAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  const validatePassword = (value: string) => {
    const containsAtLeastOneNumber = /\d/.test(value);
    const containsAtLeastOneLetter = /[a-zA-Z]/.test(value);

    if (!containsAtLeastOneNumber || !containsAtLeastOneLetter) {
      return 'Пароль должен содержать минимум одну букву и цифру';
    }

    return true;
  };

  const onSubmit = (data: FormData): void => {
    dispatch(
      loginAction({
        email: data.email,
        password: data.password,
      })
    );
  };

  return (
    <main className="decorated-page login">
      <div className="decorated-page__decor" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/maniac/maniac-size-m.webp, img/content/maniac/maniac-size-m@2x.webp 2x"
          />
          <img
            src="img/content/maniac/maniac-size-m.jpg"
            srcSet="img/content/maniac/maniac-size-m@2x.jpg 2x"
            width="1366"
            height="768"
            alt=""
          />
        </picture>
      </div>
      <div className="container container--size-l">
        <div className="login__form">
          <form
            className="login-form"
            action="https://echo.htmlacademy.ru/"
            method="post"
            onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
          >
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">
                    E&nbsp;&ndash;&nbsp;mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Адрес электронной почты"
                    {...register('email', {
                      required: 'Укажите email',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Некорректный email',
                      },
                    })}
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <span className="custom-input__error" role="alert">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Пароль"
                    {...register('password', {
                      required: 'Укажите пароль',
                      minLength: {
                        value: PasswordLength.MIN,
                        message: `Минимум ${PasswordLength.MIN} символа`,
                      },
                      maxLength: {
                        value: PasswordLength.MAX,
                        message: `Максимум ${PasswordLength.MAX} символов`,
                      },
                      validate: validatePassword,
                    })}
                    aria-invalid={errors.password ? 'true' : 'false'}
                  />
                  {errors.password && (
                    <span className="custom-input__error" role="alert">
                      {errors.password.message}
                    </span>
                  )}
                </div>
              </div>
              <button
                className="btn btn--accent btn--general login-form__submit"
                type="submit"
              >
                Войти
              </button>
            </div>
            <label className="custom-checkbox login-form__checkbox">
              <input
                type="checkbox"
                id="id-order-agreement"
                name="user-agreement"
                checked={isChecked}
                required
                onChange={(evt) => setIsChecked(evt.target.checked)}
              />
              <span className="custom-checkbox__icon">
                <svg width="20" height="17" aria-hidden="true">
                  <use xlinkHref="#icon-tick"></use>
                </svg>
              </span>
              <span className="custom-checkbox__label">
                Я&nbsp;согласен с
                <a
                  className="link link--active-silver link--underlined"
                  href="#"
                >
                  правилами обработки персональных данных
                </a>
                &nbsp;и пользовательским соглашением
              </span>
            </label>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
