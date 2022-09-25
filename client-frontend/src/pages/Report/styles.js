import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    width: '97%'
  },
  formControl: {
    width: '97%'
  },
  title : {
    padding: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  space : {
    padding: theme.spacing(1)
  },
}));