import { Props } from '@/interfaces/childProps.interface';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/store';
const PrivateRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated) {
    return <>{children}</>;
  }
  return (
    <>
      <Navigate to="/login" />
    </>
  );
};

export default PrivateRoute;
