import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className='navbar'>

      <NavLink to="/" className='homenav'>Codera</NavLink>

      <NavLink to='/questions/current'>Your Questions</NavLink>

      <NavLink to='/comments/current'>Your Comments</NavLink>

      <ProfileButton />

    </ul>
  );
}

export default Navigation;
