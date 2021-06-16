import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 210,
  },
  loading: {
    position: 'fixed',
    marginTop: -160,
    zIndex: 1,
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      marginTop: '-180px',
      marginLeft: '-180px',
      width: '90%',
      zIndex: 1,
    },
  },
  Loadingcontainer: {
    opacity: 0.7,
  }
}));