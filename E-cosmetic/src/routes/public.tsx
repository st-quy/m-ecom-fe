import App from '../App';
import PublicLayout from '~/component/templates/PublicLayout';
const routes = [
  {
    element: <PublicLayout />,
    children: [{ path: '', element: <App /> }],
  },
];

export default routes;
