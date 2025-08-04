import { Link } from 'react-router-dom';
import Map from '../../components/map/map';
import { CONTACT_INFO, CONTACT_PLACES } from '../../utils/const';

function Contacts(): JSX.Element {
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
        <div className="page-content__title-wrapper page-content__title-wrapper--underlined">
          <p className="subtitle page-content__subtitle">
            квесты в&nbsp;Санкт-Петербурге
          </p>
          <h1 className="title title--size-m page-content__title">Контакты</h1>
        </div>
        <div className="contacts">
          <dl className="contacts__list">
            <div className="contacts__item">
              <dt className="contacts__dt">Адрес</dt>
              <dd className="contacts__dd">
                <address className="contacts__address">
                  {CONTACT_INFO.city},<br/> {CONTACT_INFO.address}
                </address>
              </dd>
            </div>
            <div className="contacts__item">
              <dt className="contacts__dt">Режим работы</dt>
              <dd className="contacts__dd">
                {CONTACT_INFO.working}, с&nbsp;{CONTACT_INFO.hours.from} до&nbsp;{CONTACT_INFO.hours.to}
              </dd>
            </div>
            <div className="contacts__item">
              <dt className="contacts__dt">Телефон</dt>
              <dd className="contacts__dd">
                <Link className="link" to={CONTACT_INFO.phone.raw}>
                  {CONTACT_INFO.phone.formatted}
                </Link>
              </dd>
            </div>
            <div className="contacts__item">
              <dt className="contacts__dt">E&ndash;mail</dt>
              <dd className="contacts__dd">
                <a className="link" href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
              </dd>
            </div>
          </dl>
          <div className="contacts__map">
            <Map selectedPlace={CONTACT_PLACES[0]} places={CONTACT_PLACES}/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contacts;
