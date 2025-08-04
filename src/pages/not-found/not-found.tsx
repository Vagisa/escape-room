import { Link } from 'react-router-dom';
import './not-found.css';

function NotFound(): JSX.Element {
  return (
    <main className="page-content page__not-found">
      <div className="container">
        <h1>
          404. Page not found.
        </h1>
        <Link className="link__not-found" to="/">Go to main page</Link>
        <img className="img__not-found" src="../../../public/img/not-found.jpg" alt="Not-found" />
      </div>
    </main>
  );
}

export default NotFound;
