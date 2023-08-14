// import { lazy } from 'react';

// import Forbidden from '@app/components/molecules/Forbidden/Forbidden';
// import BrandCreate from '@app/pages/Brand/BrandCreate/BrandCreate';
// import BrandDetail from '@app/pages/Brand/BrandDetail/BrandDetail';
// import BrandList from '@app/pages/Brand/BrandList/BrandList';
// import BrandUpdate from '@app/pages/Brand/BrandUpdate/BrandUpdate';
// import UserList from '@app/pages/User/UserList/UserList';

// const PrivateLayout = lazy(() => import('@app/components/templates/PrivateLayout'));
// const Dashboard = lazy(() => import('@app/pages/Dashboard/Dashboard'));

// const RoleCreate = lazy(() => import('@app/pages/Role/RoleCreate/RoleCreate'));
// const RoleDetail = lazy(() => import('@app/pages/Role/RoleDetail/RoleDetail'));
// const RoleList = lazy(() => import('@app/pages/Role/RoleList/RoleList'));
// const RoleUpdate = lazy(() => import('@app/pages/Role/RoleUpdate/RoleUpdate'));

// const StoreCreate = lazy(() => import('@app/pages/Store/StoreCreate/StoreCreate'));
// const StoreDetail = lazy(() => import('@app/pages/Store/StoreDetail/StoreDetail'));
// const StoreList = lazy(() => import('@app/pages/Store/StoreList/StoreList'));
// const StoreUpdate = lazy(() => import('@app/pages/Store/StoreUpdate/StoreUpdate'));

// const UserCreate = lazy(() => import('@app/pages/User/UserCreate/UserCreate'));
// const UserDetail = lazy(() => import('@app/pages/User/UserDetail/UserDetail'));
// const UserUpdate = lazy(() => import('@app/pages/User/UserUpdate/UserUpdate'));

// interface Route {
//   element: JSX.Element;
//   children?: Route[];
//   path?: string;
// }

// const routes = [
//   {
//     element: <PrivateLayout />,
//     children: [
//       {
//         path: '',
//         element: <Dashboard />,
//       },
//       {
//         path: 'dashboard',
//         element: <Dashboard />,
//       },
//       {
//         path: 'roles',
//         children: [
//           {
//             path: '',
//             element: <RoleList />,
//           },
//           {
//             path: ':id',
//             element: <RoleDetail />,
//           },
//           {
//             path: 'create',
//             element: <RoleCreate />,
//           },
//           {
//             path: 'update/:id',
//             element: <RoleUpdate />,
//           },
//         ],
//       },
//       {
//         path: 'brands',
//         children: [
//           {
//             path: '',
//             element: <BrandList />,
//           },
//           {
//             path: ':id',
//             element: <BrandDetail />,
//           },
//           {
//             path: 'create',
//             element: <BrandCreate />,
//           },
//           {
//             path: 'update/:id',
//             element: <BrandUpdate />,
//           },
//         ],
//       },
//       {
//         path: '403',
//         element: <Forbidden />,
//       },
//       {
//         path: 'stores',
//         children: [
//           {
//             path: '',
//             element: <StoreList />,
//           },
//           {
//             path: ':id',
//             element: <StoreDetail />,
//           },
//           {
//             path: 'create',
//             element: <StoreCreate />,
//           },
//           {
//             path: 'update/:id',
//             element: <StoreUpdate />,
//           },
//         ],
//       },
//       {
//         path: 'users',
//         children: [
//           {
//             path: '',
//             element: <UserList />,
//           },
//           {
//             path: 'create',
//             element: <UserCreate />,
//           },
//           {
//             path: ':id',
//             element: <UserDetail />,
//           },
//           {
//             path: 'update/:id',
//             element: <UserUpdate />,
//           },
//         ],
//       },
//     ],
//   } as Route,
// ];

// export default routes;
