import React from 'react';
import './SigninLoginButton.css'

const SigninLoginButton = (props) => {

    const toggleForm = () => {
        document.getElementById(props.formName).classList.toggle(props.formName);
    }

    return(
      <button onClick={toggleForm} className={`button-style`}>
          {props.children}
      </button>
    );
}

export default SigninLoginButton;