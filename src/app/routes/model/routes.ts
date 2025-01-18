export interface routesInterface {
  main: mainRoutesInterface;
  other: otherRoutesInterface;
}

export interface mainRoutesInterface {
  home: routeInterface;
  profile: routeInterface;
  catalog: routeInterface;
  cat: routeInterface;
  account: routeInterface;
  about: routeInterface;
}

export interface routeInterface {
  path: string;
  name: string;
}

export interface otherRoutesInterface {
  'not-found': string;
}

export const routes: routesInterface = {
  main: {
    home: { path: '/', name: 'Главная' },
    profile: { path: '/User', name: 'Профиль' },
    catalog: { path: '/Catalog', name: 'Каталог' },
    cat: { path: '/Cat', name: 'Мой кот' },
    account: { path: '/Account', name: 'Мой счёт' },
    about: { path: '/About', name: 'О нас' },
  },
  other: {
    'not-found': '*',
  },
};
