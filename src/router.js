import VueRouter from 'vue-router';
import banner from './components/items/Banner';
import home from './components/Home';
import playlist from './components/playlist/Playlist';
import create from './components/playlist/Create';
import edit from './components/playlist/Edit';
import NotFound from './components/NotFound';

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            component: banner
            //redirect: '/home',
            // pathMatch: 'full',
            // component: WelcomeComponent,
            // canActivate: [AuthGuard],
            // data: {
            //   isLogged: false
            // }
          },
          {
              path: '/home',
              component: home
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
            path: '/playlist/',
            redirect: '/playlist/create',
            component: playlist,
            children: [
              {
                path: 'create',
                component: create
              },
              {
                path: 'edit',
                component: edit
              }
            ]
          },
          {
            path: '**',
            component: NotFound
          }
    ]
});

export default router;