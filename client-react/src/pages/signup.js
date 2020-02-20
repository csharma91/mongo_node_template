import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppIcon from "../images/forex.png";
import axios from "axios";

// import AppIcon from "../images/Forex.png";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

const styles = theme => ({
  ...theme.spreadThis
});

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      //   confirmPassword: "",
      name: "",
      loading: false,
      errors: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      //   confirmPassword: this.state.confirmPassword,
      name: this.state.name
    };
    axios
      .post("api/users", newUserData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("AuthToken", res.data.token);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err.response.data);
        console.log(typeof err.response.data);
        this.setState({
          errors: err.response.data.errors[0],
          loading: false
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="money" className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Sign Up
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="name"
              name="name"
              type="text"
              label="Enter Name"
              className={classes.textfield}
              //   helperText={errors.msg}
              //   error={errors.msg ? true : false}
              value={this.state.name}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textfield}
              helperText={errors.msg}
              error={errors.msg ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textfield}
              helperText={errors.msg}
              error={errors.msg ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Sign Up
            </Button>
            <br />
            <small>
              Already have an Account?<Link to="/login">Login Here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(signup);
