import './assets/styles/custom.scss';
import './App.css';
import Routes from 'Routes';

function App() {
  return (
    <>
      <Routes />
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
