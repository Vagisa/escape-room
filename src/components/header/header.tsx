import { Link } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import { useAuth } from '../../hooks/auth';
import { useAppDispatch } from '../../hooks';
import { MouseEvent } from 'react';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {
  const userIsAuth = useAuth();
  const dispatch = useAppDispatch();

  const handleLogout = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };
  return (
    <header className="header">
      <div className="container container--size-l">
        <Link
          className="logo header__logo"
          to={AppRoute.Root}
          aria-label="Перейти на Главную"
        >
          <svg width="134" height="52" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link not-disabled active" to={AppRoute.Root}>
                Квесты
              </Link>
            </li>
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.Contacts}>
                Контакты
              </Link>
            </li>
            {userIsAuth &&
            <li className="main-nav__item">
              <Link className="link" to={AppRoute.MyQuests}>
                Мои бронирования
              </Link>
            </li>}
          </ul>
        </nav>
        <div className="header__side-nav">
          {userIsAuth
            ?
            <Link
              className="btn btn--accent header__side-item"
              onClick={handleLogout}
              to={AppRoute.Root}
            >
              Выйти
            </Link>
            :
            <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>
              Вход
            </Link>}
          <Link
            className="link header__side-item header__phone-link"
            to="tel:80001111111"
          >
            8 (000) 111-11-11
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
