function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container container--size-l">
        <a
          className="logo header__logo"
          href="index.html"
          aria-label="Перейти на Главную"
        >
          <svg width="134" height="52" aria-hidden="true">
            <use xlinkHref="#logo"></use>
          </svg>
        </a>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <a className="link not-disabled active" href="index.html">
                Квесты
              </a>
            </li>
            <li className="main-nav__item">
              <a className="link" href="contacts.html">
                Контакты
              </a>
            </li>
            <li className="main-nav__item">
              <a className="link" href="my-quests.html">
                Мои бронирования
              </a>
            </li>
          </ul>
        </nav>
        <div className="header__side-nav">
          <a className="btn btn--accent header__side-item" href="#">
            Выйти
          </a>
          <a
            className="link header__side-item header__phone-link"
            href="tel:88003335599"
          >
            8 (000) 111-11-11
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
