import {
  AUTHORIZATION_ROUTE,
  CATEGORIES_ROUTE,
  CATEGORY_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PERSONNELS_ROUTE,
  STATISTICS_ROUTE,
  TABLES_ROUTE,
} from '../config/consts';
import Auth from '../pages/Auth';
import CategoriesPage from '../pages/CategoriesPage';
import CategoryPage from '../pages/CategoryPage';
import HomePage from '../pages/HomePage';
import PersonnelsPage from '../pages/PersonnelsPage';
import StatisticsPage from '../pages/StatisticsPage';
import TablesPage from '../pages/TablesPage';

export const publicPages = [
  {
    path: LOGIN_ROUTE,
    component: <Auth />,
    caseSensitive: true,
  },
  {
    path: AUTHORIZATION_ROUTE,
    component: <Auth />,
    caseSensitive: true,
  },
  {
    path: HOME_ROUTE,
    component: <HomePage />,
    caseSensitive: true,
  },
  {
    path: CATEGORIES_ROUTE,
    component: <CategoriesPage />,
    caseSensitive: true,
  },
  {
    path: CATEGORY_ROUTE,
    component: <CategoryPage />,
    caseSensitive: true,
  },
];

export const privatePages = [
  {
    path: HOME_ROUTE,
    component: <HomePage />,
    caseSensitive: true,
  },
  {
    path: CATEGORIES_ROUTE,
    component: <CategoriesPage />,
    caseSensitive: true,
  },
  {
    path: CATEGORY_ROUTE,
    component: <CategoryPage />,
    caseSensitive: true,
  },
  {
    path: TABLES_ROUTE,
    component: <TablesPage />,
    caseSensitive: true,
  },
  {
    path: PERSONNELS_ROUTE,
    component: <PersonnelsPage />,
    caseSensitive: true,
  },
  {
    path: STATISTICS_ROUTE,
    component: <StatisticsPage />,
    caseSensitive: true,
  },
];
