import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../utils/const';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Booking from '../../pages/booking/booking';
import Contacts from '../../pages/contacts/contacts';
import Login from '../../pages/login/login';
import MyQuests from '../../pages/my-quests/my-quests';
import Quest from '../../pages/quest/quest';
import NotFound from '../../pages/not-found/not-found';
import { useAppSelector } from '../../hooks';
import { selectAuthorizationStatus } from '../../store/selectors/user';
import { selectQuestsLoadingStatus } from '../../store/selectors/quest';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const isQuestsLoading = useAppSelector(selectQuestsLoadingStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown || isQuestsLoading) {
    return (
      <LoadingScreen />
    );
  }
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
          <Route path={AppRoute.NotFound} element={<NotFound />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
