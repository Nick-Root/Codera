import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className='navbar'>

      <NavLink to="/" className='homenav'>Codera</NavLink>



      <ProfileButton />

    </ul>
  );
}

export default Navigation;
