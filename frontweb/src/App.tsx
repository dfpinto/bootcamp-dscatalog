import Navbar from 'components/Navbar';
import './assets/styles/custom.scss';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <h1>Hello DSCatalog</h1>
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
