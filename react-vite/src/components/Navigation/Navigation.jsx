import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import { useEffect, useState, useRef } from "react";
//import { useDispatch } from "react-redux";
import OpenModalMenuItem from "./OpenModalMenuItem";
import CreateQuestionModal from "../CreateQuestionModal/CreateQuestionModal";

function Navigation() {
  //logic for Modal
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  useEffect(() => {
      if (!showMenu) return;
      //if showMenu is true, we have a closeMenu
      const closeMenu = (e) => {
          if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
          }
      };
      document.addEventListener('click', closeMenu);

      return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  //added in bonus optional
  const closeMenu = () => setShowMenu(false);

  return (
    <ul className='navbar'>

      <NavLink to="/" className='homenav'>Codera</NavLink>

      <NavLink to='/questions/current' className={'navLink'}>Your Questions</NavLink>

      <NavLink to='/comments/current' className={'navLink'} >Your Comments</NavLink>

      <NavLink to='/savedQuestions' className={'navLink'}>Saved Questions</NavLink>

      <div id="ask-question-button">
        <OpenModalMenuItem
            itemText='Add question'
            onItemClick={closeMenu}
            className='questionmodal'
            modalComponent={<CreateQuestionModal />}
        />
      </div>

      <ProfileButton />

    </ul>
  );
}

export default Navigation;
