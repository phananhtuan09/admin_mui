import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { publicRoutes } from '@/routes/publicRoutes';

import React, { Fragment, Suspense } from 'react';
import PrivateRoute from '@/routes/privateRoutes';
// import * as testApi from '@/apiServices/testApi'
// theme
import ScrollToTop from '@/utils/ScrollToTop';

import { BaseOptionChartStyle } from '@/Components/Global/chart/BaseOptionChart';

const DefaultLayout = React.lazy(
  () => import('@/Components/Layout/DefaultLayout')
);
const NotFoundPage = React.lazy(() => import('@/Pages/NotFound'));

interface MyInFo {
  name: string;
  job: string;
}

function App() {
  //useEffect(() => {
  //let myInfo = {
  //   name: 'Tuan',
  //   email: 'dfbgdfbdf@gmail.com',
  //   gender: 'male',
  //   status: 'active',
  // name: 'morpheus',
  //job: 'zion resident',
  //}
  // const fetchApi = async () => {
  //   const result = await testApi.addUsers(myInfo)
  //   console.log(result)
  // }
  // fetchApi()
  // const handleEditUser = async () => {
  //const result = await testApi.getUsers(2)
  //const result = await testApi.addUsers(myInfo)
  // const result = await testApi.editUsers(2, myInfo)

  // const result = await testApi.deleteUsers(2)

  //console.log('result', result)
  //}

  //handleEditUser()
  // }, [])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Routes>
        {publicRoutes.map((route) => {
          let Layout!: React.ElementType;
          if (route.layout) {
            Layout = route.layout;
          } else {
            Layout = DefaultLayout;
          }
          return (
            <Route
              path={route.path}
              element={
                <Suspense fallback={<>...</>}>
                  <Layout>
                    {route.private ? (
                      <PrivateRoute>
                        <route.element />
                      </PrivateRoute>
                    ) : (
                      <route.element />
                    )}
                  </Layout>
                </Suspense>
              }
              key={route.path}
            />
          );
        })}
        <Route
          path="*"
          element={
            <Suspense fallback={<>...</>}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
