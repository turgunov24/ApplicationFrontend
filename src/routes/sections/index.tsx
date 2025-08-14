import type { RouteObject } from 'react-router'

import { lazy } from 'react'
import { Navigate } from 'react-router'

import { CONFIG } from 'src/global-config'

import { authRoutes } from './auth'
import { mainRoutes } from './main'
import { authDemoRoutes } from './auth-demo'
import { dashboardRoutes } from './dashboard'
import { componentsRoutes } from './components'

// ----------------------------------------------------------------------

// const HomePage = lazy(() => import('src/pages/home'));
const Page404 = lazy(() => import('src/pages/error/404'));

export const routesSection: RouteObject[] = [
  {
    path: '/',
    /**
     * @skip homepage
     * import { Navigate } from "react-router";
     * import { CONFIG } from 'src/global-config';
     *
     * element: <Navigate to={CONFIG.auth.redirectPath} replace />,
     * and remove the element below:
     */
    element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    // element: (
    //   <Suspense fallback={<SplashScreen />}>
    //     <MainLayout>
    //       <HomePage />
    //     </MainLayout>
    //   </Suspense>
    // ),
  },

  // Auth
  ...authRoutes,
  ...authDemoRoutes,

  // Dashboard
  ...dashboardRoutes,

  // Main
  ...mainRoutes,

  // Components
  ...componentsRoutes,

  // No match
  { path: '*', element: <Page404 /> },
];
