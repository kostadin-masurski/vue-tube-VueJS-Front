import VueRouter from 'vue-router'
import Home from './components/Home'
import NotFound from './components/NotFound'

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            redirect: '/home',
            // pathMatch: 'full',
            // component: WelcomeComponent,
            // canActivate: [AuthGuard],
            // data: {
            //   isLogged: false
            // }
          },
          {
              path: '/home',
              component: Home
          },
          {
            path: '/login',
            redirect: '/'
          },
          {
            path: '/register',
            component: () => import('./components/Register'),
            // canActivate: [AuthGuard],
            // data: {
            //   isLogged: false
            // }
          },
          {
            path: '**',
            component: NotFound
          }
    ]
});

export default router;