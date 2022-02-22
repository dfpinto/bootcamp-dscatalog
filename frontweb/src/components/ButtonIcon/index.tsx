import './styles.css';
import {ReactComponent as ArrowImg} from 'assets/images/arrow.svg';

type Props = {
  text: string;
}

const ButtonIcon = ({text}:Props) => {
  return (
    <div className="buttom-container">
      <button className="btn btn-primary">
        <h6>{text}</h6>
      </button>
      <div className="buttom-container-icon">
          <ArrowImg/>
      </div>
    </div>
  );
};

export default ButtonIcon;
