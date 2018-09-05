import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import * as sessionActions from "../../actions/sessionActions";

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    color: "white"
  },
  link: {
    textDecoration: "none",
    color: "white"
  }
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
    this.props.actions.logOutUser();
    this.setState({ anchorEl: null });
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="title"
              color="inherit"
              className={classes.flex}
            >
              <Link className={classes.link} to="/">
                PlaceList
              </Link>
            </Typography>
            {this.props.session ? (
              <div>
                <Link className={classes.link} to="/map">
                  <Button className={classes.button}>Map</Button>
                </Link>
                <Link className={classes.link} to="/places">
                  <Button className={classes.button} to="places">
                    List
                  </Button>
                </Link>
                <Link className={classes.link} to="/about">
                  <Button className={classes.button}>About</Button>
                </Link>
                <IconButton
                  aria-owns={open ? "menu-appbar" : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.handleClose}>My account</MenuItem>
                  <MenuItem onClick={this.logOut}>Log Out</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <div>
                  <Link className={classes.link} to="/login">
                    <Button
                      variant="outlined"
                      color="primary"
                      className={classes.button}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link className={classes.link} to="/signup">
                    <Button className={classes.button}>Sign Up</Button>
                  </Link>
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  session: state.session
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(sessionActions, dispatch)
});

Header.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({
    logOutUser: PropTypes.func.isRequired
  }).isRequired,
  session: PropTypes.bool.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Header);
