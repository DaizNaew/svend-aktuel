
import HomePage from '../pages/home.vue';
import ChatPage from '../pages/chat.vue';

import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/chat/:userid?',
    component: ChatPage,
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;
