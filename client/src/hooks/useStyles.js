import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '50%',
    },
    [theme.breakpoints.up('md')]: {
      width: '33.33%',
    },
    [theme.breakpoints.up('lg')]: {
      width: '25%',
    },
  },
  listItemLink: {
    textDecoration: 'none',
    width: '100%',
  },
  listItem: {
    height: '150px',
    backgroundColor: '#121212',
    borderRadius: '15px',
    [theme.breakpoints.up('xs')]: {
      height: '150px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '150px',
    },
    [theme.breakpoints.up('md')]: {
      height: '150px',
    },
  },
  listItemText: {
    color: 'red',
  },
  chartContainer: {
    margin: '20px auto',
    maxWidth: 600,
  },
  chartTitle: {
    marginBottom: 10,
  },
  navBar: {
    position: 'relative',
    backgroundColor: '#121212 !important',
  },
  mobileMenu: {
    display: 'flex',
    flexDirection: 'column',
  },
  mobileMenuLinks: {
    alignSelf: 'flex-start',
    textDecoration: 'none',
    marginBottom: 10 + 'px',
    color: '#121212',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  restaurantSubMenu: {
    color: '#121212',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  subMenuBtn: {
    color: '#ffffff !important',
  },
  mainMenuLinks: {
    color: 'white',
    textDecoration: 'none',
  },
}));

export default useStyles;
