import VueRouter from 'vue-router';
import globalStore from './store/global';
import banner from './components/items/Banner';
import home from './components/Home';
import NotFound from './components/NotFound';

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/',
            component: banner,
            meta: {
              authenticated: false
            }
          },
          {
              path: '/home',
              component: home,
              meta: {
                authenticated: true
              }
          },
          {
            path: '/login',
            redirect: '/'
          },
          {
            path: '/register',
            component: () => import('./components/Register'),
            meta: {
              authenticated: false
            }
          },
          {
            path: '/playlist/',
            redirect: '/playlist/create',
            component: () => import('./components/playlist/Playlist'),
            children: [
              {
                path: 'create',
                component: () => import('./components/playlist/Create'),
                meta: {
                  authenticated: true
                }
              },
              {
                path: 'edit',
                component: () => import('./components/playlist/Edit'),
                meta: {
                  authenticated: true
                }
              }
            ]
          },
          {
            path: '**',
            component: NotFound
          }
    ]
});

router.beforeEach((to, from, next) => {

  function proceed(unsub) {
    const { authenticated } = to.meta;
    const isLogged = globalStore.isLogged;
    if (
      (authenticated && isLogged) ||
      (!authenticated && !isLogged)
    ) { next(); return; }

    if (unsub) { unsub(); }
    next(authenticated ? '/' : '/home');
  }

  if (globalStore.isUserSet) { proceed(); return; }
  const unsub = globalStore.$watch('user', () => {
    proceed(unsub);
  });

});

export default router;