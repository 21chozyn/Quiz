import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "../RulesPopup/index.scss";


const RulesPopup = () => {
  return (
    <div className="popup rules">
        <h3>Are you sure you want to quit?</h3>
        <span>Your quiz progress will not be saved</span>
      <NavLink
          exact="true"
          activeclassname="active"
          to="/"
          className="team-link"  
        >
          Yes, go home
        </NavLink>
        <NavLink
          exact="true"
          activeclassname="active"
          to="/settings"
          className="team-link"  
        >
          Yes , I would like to change a setting
          <FontAwesomeIcon icon={faGear} />

        </NavLink>
    </div>
  );
};

export default RulesPopup;
