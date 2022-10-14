import ApiClient from './apiClient';
// function GetAccessToken() {
//   let accessToken = '';
//   console.log('userInfo');
//   const { userInfo, loading, error, isAuthenticated } = useAppSelector(
//     (state) => state.auth
//   );
//   console.log('userInfo', userInfo);
//   console.log('isAuthenticated', isAuthenticated);
//   console.log('loading', loading);
//   console.log('error', error);
//   //   if (userInfo.accessToken) {
//   //     accessToken = userInfo.accessToken;
//   //   }
//   console.log('accessToken');
//   return accessToken;
// }

export const geAllUser = async (userToken = '') => {
  const response = await ApiClient.get('/users', {}, {}, userToken);
  return response;
};
