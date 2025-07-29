import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../utils/const';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Booking from '../../pages/booking/booking';
import Contacts from '../../pages/contacts/contacts';
import Login from '../../pages/login/login';
import MyQuests from '../../pages/my-quests/my-quests';
import Quest from '../../pages/quest/quest';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main />} />
          <Route path={AppRoute.Booking} element={<Booking />} />
          <Route path={AppRoute.Contacts} element={<Contacts />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.MyQuests} element={<MyQuests />} />
          <Route path={AppRoute.Quest} element={<Quest />} />
          {/* <Route
                        // path={AppRoute.NotFound}
                        // element={<NotFound />}
                    /> */}
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
