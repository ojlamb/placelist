import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import MUIPlacesAutocomplete, {
  geocodeByPlaceID
} from "mui-places-autocomplete";

class NewPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: {
        name: "",
        address: "",
        category: "",
        description: "",
        lat: 0,
        lon: 0
      },
      saving: false
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onAddressChange = this.onAddressChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onNameChange = event => {
    const place = this.state.place;
    place.name = event.target.value;
    this.setState({ place });
  };

  onAddressChange = event => {
    const place = this.state.place;
    place.address = event.target.value;
    this.setState({ place });
  };

  onCategoryChange = event => {
    const place = this.state.place;
    place.category = event.target.value;
    this.setState({ place });
  };

  onDescriptionChange = event => {
    const place = this.state.place;
    place.description = event.target.value;
    this.setState({ place });
  };

  onSuggestionSelected = suggestion => {
    const place = this.state.place;
    place.name = suggestion.structured_formatting.main_text;
    geocodeByPlaceID(suggestion.place_id)
      .then(results => {
        const { geometry } = results[0];
        place.lat = geometry.location.lat();
        place.lon = geometry.location.lng();
        place.address = results[0].formatted_address;
        this.setState({ place });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onClickSave = () => {
    console.log(this.state.place);
    this.props.createPlace(this.state.place);
  };

  render() {
    return (
      <Dialog
        open={this.props.formOpen}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Place</DialogTitle>
        <DialogContent
          style={{
            paddingLeft: "25px",
            paddingRight: "25px"
          }}
        >
          <DialogContentText style={{ marginBottom: "10px" }}>
            Please fill out the place form to add your spot to the list!
          </DialogContentText>
          <MUIPlacesAutocomplete
            style={{
              marginTop: 25
            }}
            onSuggestionSelected={this.onSuggestionSelected}
            renderTarget={() => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              />
            )}
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            onChange={this.onNameChange}
            value={this.state.place.name}
          />
          <TextField
            margin="dense"
            id="name"
            label="Address"
            type="address"
            fullWidth
            onChange={this.onAddressChange}
            value={this.state.place.address}
          />
          <Select
            style={{ marginTop: "13px" }}
            onChange={this.onCategoryChange}
            value={this.state.place.category}
            fullWidth
            label="Category"
            name="category"
            displayEmpty
          >
            <MenuItem value="" disabled>
              Category
            </MenuItem>
            <MenuItem value={"drinks"}>Drinks</MenuItem>
            <MenuItem value={"dinner"}>Dinner</MenuItem>
            <MenuItem value={"burgers"}>Burgers</MenuItem>
            <MenuItem value={"tacos"}>Tacos</MenuItem>
            <MenuItem value={"sushi"}>Sushi</MenuItem>
            <MenuItem value={"brewery"}>Brewery</MenuItem>
            <MenuItem value={"club"}>Club</MenuItem>
            <MenuItem value={"coffee"}>Coffee</MenuItem>
            <MenuItem value={"lunch"}>Lunch</MenuItem>
            <MenuItem value={"brunch"}>Brunch</MenuItem>
          </Select>
          <TextField
            margin="dense"
            id="name"
            label="Description"
            type="description"
            fullWidth
            onChange={this.onDescriptionChange}
            value={this.state.place.description}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onClickSave} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

NewPlace.propTypes = {
  createPlace: PropTypes.func.isRequired,
  formOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default NewPlace;
