import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul className='navbar'>

      <NavLink to="/" className='homenav'>Codera</NavLink>

      <NavLink to='/questions/current' className={'navLink'}>Your Questions</NavLink>

      <NavLink to='/comments/current' className={'navLink'} >Your Comments</NavLink>

      <NavLink to='/savedQuestions' className={'navLink'}>Saved Questions</NavLink>

      <ProfileButton />

    </ul>
  );
}

export default Navigation;
