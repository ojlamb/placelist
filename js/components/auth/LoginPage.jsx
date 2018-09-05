import React from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import * as sessionActions from "../../actions/sessionActions";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  link: {
    textDecoration: "none"
  }
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { credentials: { email: "", password: "" } };
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onChange(event) {
    const field = event.target.name;
    const credentials = this.state.credentials;
    credentials[field] = event.target.value;
    return this.setState({ credentials });
  }
  onSave(event) {
    event.preventDefault();
    this.props.actions.loginUser(this.state.credentials);
    this.props.history.push("/");
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="headline">Sign in to PlaceList</Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={this.state.credentials.email}
                  onChange={this.onChange}
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  value={this.state.credentials.password}
                  autoComplete="current-password"
                  onChange={this.onChange}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={classes.submit}
                onClick={this.onSave}
              >
                Sign in
              </Button>
            </form>
            <p>
              New User?
              <Link className={classes.link} to="/signup">
                <Button size="small" color="primary">
                  Sign Up
                </Button>
              </Link>
            </p>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

LoginPage.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({
    loginUser: PropTypes.func.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default compose(
  withStyles(styles),
  connect(
    null,
    mapDispatchToProps
  )
)(LoginPage);
