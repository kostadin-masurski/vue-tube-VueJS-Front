import VueRouter from 'vue-router';
import home from './components/Home';
import playlist from './components/playlist/Playlist';
import playlistCreate from './components/playlist/Playlist-create';
import NotFound from './components/NotFound';

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
            component: playlist,
            children: [
              {
                path: 'create',
                component: playlistCreate
              },
              {
                path: 'edit',
                component: playlistCreate
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