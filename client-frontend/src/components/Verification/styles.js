import { makeStyles, } from '@material-ui/core/styles';
import blue from "@material-ui/core/colors/blue";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    align: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '5px',
    position: 'relative',
  },
  img: {
    height: '400px',
    margin: '10px',
  },
  input: {
        display: "none"
      },
  button: {
        color: blue[900],
        margin: 10,
      },
  title: {
        color: "gray",
        margin: 10
      },
  submitButton: {
        margin: '10px',
        display: 'flex',
        justify: "flex-end",
      },
}));