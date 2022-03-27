import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import './styles.css';
import ButtonIcon from 'components/ButtonIcon';
import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/requests';

function Home() {
  return (
    <div className="home-container">

      <h1>{getTokenData()?.user_name}</h1>
      <h2>{isAuthenticated() ? 'Autenticado': 'Não autenticado'}</h2>

      <div className="base-card home-card">
        <div className="home-content-container">
          <div>
            <h1>Conheça o melhor catálogo de produtos</h1>
            <p>Ajudaremos você a encontrar os melhores produtos do mercado</p>
          </div>
          <Link to="/products">
            <ButtonIcon text = "INICIE AGORA A SUA BUSCA"/>
          </Link>
        </div>
        <div className="home-image-container">
          <MainImage />
        </div>
      </div>
    </div>
  );
}

export default Home;
