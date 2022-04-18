import { Redirect, Route } from 'react-router-dom';
import { hasAnyRole, isAuthenticated, Role } from 'util/auth';

type Props = {
  children: React.ReactNode;
  path: string;
  roles?: Role[];
};

// roles = [] -- define um valor default caso nenhum valor seja informado.
const PrivateRoute = ({ children, path, roles = []}: Props) => {
  return (
    <Route
      path={path}
      render={({ location }) =>
        !isAuthenticated() ? (
          // se não estiver logado redireciona para o login passando como parâmetro o state que contém a rota informada / pretendida.
          <Redirect
            to={{ pathname: '/admin/auth/login', state: location.pathname }}
          />
        ) : !hasAnyRole(roles) ? (
          // se não estiver logado redireciona para o login passando como parâmetro o state que contém a rota informada / pretendida.
          <Redirect to="/admin/products" />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
