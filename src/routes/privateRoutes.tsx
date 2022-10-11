import { Props } from '@/interfaces/childProps.interface';
import { Navigate } from 'react-router-dom';
const PrivateRoute = ({ children }: Props) => {
  const user = localStorage.getItem('userInfo') || '';
  if (user) {
    return <>{children}</>;
  } else {
    return (
      <>
        <Navigate to="/login" />
      </>
    );
  }
};

export default PrivateRoute;
