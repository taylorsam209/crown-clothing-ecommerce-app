import React, { Component } from "react";
import "./sign-in.styles.scss";
import "../form-input/form-input.component";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (err) {
      console.error(err);
    }

  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            value={email}
            required
            handleChange={this.handleChange}
            label="email"
          />
          <FormInput
            name="password"
            value={password}
            required
            handleChange={this.handleChange}
            label="password"
          />
          <div class="buttons">
            <CustomButton type="submit">Sign In</CustomButton>{" "}
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn type='button'>
              Sign In With Google
            </CustomButton>{" "}
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
