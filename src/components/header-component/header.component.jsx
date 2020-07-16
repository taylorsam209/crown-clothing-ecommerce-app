import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/original.svg";
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
const Header = ({currentUser}) => {
  return (
    <div className="header">
      <Link to="/">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/contact">
          CONTACT
        </Link>
        {currentUser ?
        <div className='options' onClick={() => auth.signOut()}>SIGN OUT</div> : <Link to='/sign-in'>SIGN IN</Link>}
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  console.log('state', state)
  return {
    currentUser: state.user.currentUser
  }
}

export default connect(mapStateToProps)(Header);