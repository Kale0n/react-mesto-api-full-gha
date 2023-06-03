import {Link} from "react-router-dom"

function Header(props) {
  return (
    <header className="header">
        <a href="#" className="header__logo"></a>
        <div className="header__link-container">
          {props.email && <p className="header__email">{props.email}</p>}
          {props.onClick ? 
            <button className="header__signout" onClick={props.onClick}>{props.linkText}</button>
            :
            <Link to={props.linkUrl} className="header__sign">{props.linkText}</Link>
          }
        </div>

    </header>
  );
}

export default Header;