import { useAppSelector } from './index.ts';
import { selectAuthorizationStatus } from '../store/selectors/user.ts';
import { AuthorizationStatus } from '../utils/const.ts';

const useAuth = () => useAppSelector(selectAuthorizationStatus) === AuthorizationStatus.Auth;

export { useAuth };
