import { FormEvent, useRef, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { Navigate } from 'react-router-dom';
import { AppRoute, PasswordLength } from '../../utils/const';
import { loginAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

function Login(): JSX.Element {
  const userIsAuth = useAuth();
  const [isChecked, setIsChecked] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordReff = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  if (userIsAuth) {
    return <Navigate to={AppRoute.Root} />;
  }

  const validatePassword = (): boolean => {
    if (!passwordReff?.current) {
      return false;
    }

    const password = passwordReff.current.value.trim();

    const isCorrectLength = password.length >= PasswordLength.MIN && password.length <= PasswordLength.MAX;
    const containsAtLeastOneNumber = /\d/.test(password);
    const containsAtLeastOneLetter = /[a-zA-Z]/.test(password);

    return isCorrectLength && containsAtLeastOneNumber && containsAtLeastOneLetter;
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && validatePassword()) {
      dispatch(loginAction({
        email: emailRef.current.value,
        password: passwordReff?.current?.value || '',
      }));
    }
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
            onSubmit={handleSubmit}
          >
            <div className="login-form__inner-wrapper">
              <h1 className="title title--size-s login-form__title">Вход</h1>
              <div className="login-form__inputs">
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="email">
                    E&nbsp;&ndash;&nbsp;mail
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Адрес электронной почты"
                    required
                  />
                </div>
                <div className="custom-input login-form__input">
                  <label className="custom-input__label" htmlFor="password">
                    Пароль
                  </label>
                  <input
                    ref={passwordReff}
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Пароль"
                    required
                  />
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
