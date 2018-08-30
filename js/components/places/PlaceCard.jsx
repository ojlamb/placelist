import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  link: {
    textDecoration: "none"
  }
};

class PlaceCard extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  props: {
    name: string,
    address: string,
    upvotes: number,
    category: string,
    id: number
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={`/public/images/${this.props.category}.jpg`}
          title="Work and Class"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {this.props.name}
          </Typography>
          <Typography component="p">{this.props.address}</Typography>
          <Typography component="p">{this.props.upvotes}</Typography>
        </CardContent>
        <CardActions>
          <Link className={classes.link} to={`/place/${this.props.id}`}>
            <Button size="small" color="primary">
              More
            </Button>
          </Link>
        </CardActions>
      </Card>
      // <Wrapper className="place-card" to={`/place/${this.props.id}`}>
      //   <div>
      //     <h3>{this.props.name}</h3>
      //     <h4>{this.props.address}</h4>
      //     <p>{this.props.upvotes}</p>
      //   </div>
      // </Wrapper>
    );
  }
}
PlaceCard.propTypes = {
  classes: PropTypes.shape({}).isRequired
};

export default withStyles(styles)(PlaceCard);
