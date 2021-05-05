import React, { Component } from "react";
import './Signin.css';
class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  onInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmitSignIn = () => {
    const { email, password } = this.state;
    const { onRouteChange, loadUser } = this.props;

    fetch("https://smart-brain-api-cdh.herokuapp.com/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.success === true) {
          this.saveAuthTokenInSessions(data.token);
          loadUser(data.user);
          onRouteChange("home");
        }
      })
      .catch(console.log);

    this.setState({ email: "", password: "",})
  };

  render() {
    const { onRouteChange } = this.props;
    const { email, password } = this.state;

    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="email"
                  name="email"
                  value={email}
                  id="email-address"
                  onChange={this.onInputChange}
                />
              </div>

              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 hover-black"
                  type="password"
                  name="password"
                  value={password}
                  id="password"
                  onChange={this.onInputChange}
                />
              </div>
            </fieldset>

            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>

            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Signin;
