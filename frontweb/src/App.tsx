import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/custom.scss';
import './App.css';
import Routes from 'Routes';
import { useState } from 'react';
import { AuthContext, AuthContextData } from 'AuthContext';
import { ToastContainer } from 'react-toastify';

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false
  })

  return (
    <>
      <AuthContext.Provider value={{authContextData, setAuthContextData}}>
      <Routes />
      <ToastContainer />
      </AuthContext.Provider>
    </>
  );
}

/*
   a função acima também poderia ser escrita com lambda:

   const App () => {
     return <h1>Hello DSCatalog</h1>;
   }
*/

export default App;
