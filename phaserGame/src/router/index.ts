const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
    redirect: '/tabs/play'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
        redirect: '/tabs/play'
      },
      {
        path: 'tab1',
        component: () => import('@/views/AboutPage.vue')
        path: 'play',
        component: () => import('@/views/PlayPage.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/PlayPage.vue')
        path: 'about',
        component: () => import('@/views/AboutPage.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/ScoresPage.vue')
        path: 'scores',
        component: () => import('@/views/ScoresPage.vue')
      }
    ]
  }