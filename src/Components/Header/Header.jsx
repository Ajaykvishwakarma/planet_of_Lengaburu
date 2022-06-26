import style from './Header.module.css';
import { Link } from 'react-router-dom';

export const Header = () => {
    return (
      <div className={style.nav_tag}>
        <div className={style.header}>
          <Link className={style.logo} to="/">
            Finding Falcone
          </Link>
        </div>
        <div className={style.menu}>
            <div>
                <Link to='/' >Reset</Link>
            </div>
            <div> | </div>
            <div>
                <Link to='/' >Home</Link>
            </div>
        </div>
      </div>
    );
  };
  

  