import React, { useState } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Collapse, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import CheckWithdrawalWindow from './Popup/CheckWithdrawalWindow';
import pic from '../img/table.jpg';
import { selectPersonnelsList } from '../store/selectors/selectors';
import { clearTableOrders, saveSalesDate } from '../store/actions/servicesActions';
import { deleteTable } from '../store/actions/tablesActions';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TablesItem({ table }) {
    const [expanded, setExpanded] = useState(false);
    const personnel = useSelector(selectPersonnelsList);
    const [open, setOpen] = useState(false);
    const [waiter, setWaiter] = useState('');
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setWaiter(event.target.value);
    };
    
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    const getFullPrice = () => {
        let sum = table.order.map((element) => element.price * element.numbers);

        return sum.flat().reduce((acc, val) => { return acc + val }, 0);
    }

    const toCalculate = () => {
        if(waiter) {
            calculateТheСlient();
            setOpen(true);    
        }
    }

    function getOrderInfo() {
        return {
            table: table.name,
            waiter,
            order: table.order,
            sum: getFullPrice(),
        };
    }

    const calculateТheСlient = () => {
        dispatch(saveSalesDate(getOrderInfo()));
    }
    
    const handleClose = () => {
        setOpen(false);
        dispatch(clearTableOrders(table._id, []));
    }

    function deleteItem(e) {
        e.stopPropagation();
        dispatch(deleteTable(table._id));
    }

    return (
    <React.Fragment>    
        <Grid item xs={12} sm={6} md={4} lg={3}>            
            <Card style={{position:'relative'}}>
                <CardMedia
                    component='img'
                    height='200'
                    image={pic}
                    alt={`table` + table._id}    
                    />
                <CardContent>
                    <Button
                        onClick={deleteItem}    
                        variant='text'                            
                        style={{position:'absolute', top: 0, right: -10, color: 'blue', fontSize: 30, width: 40, padding: 0}}    
                    >&#8722;</Button>        
                    <Typography>
                        {table.name}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Typography>
                        Info        
                    </Typography>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {table.order.length > 0
                        ? <CardContent>
                            <Box>
                                Офіціант:
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-helper-label">Ім'я</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-helper-label"
                                        id="demo-simple-select-helper"
                                        value={waiter}
                                        label="Ім'я"
                                        onChange={handleChange}
                                    >
                                        {personnel.map((waiter) => <MenuItem key={waiter._id} value={waiter.name}>{waiter.name}</MenuItem>)}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                Замовлення:
                                {table.order.map((element) =>
                                    (
                                        <Typography
                                            style={{ display: 'flex', justifyContent: 'space-between' }}
                                            key={element._id}
                                            paragraph
                                        >
                                            <span>{element.name}:</span>
                                            <span>{element.numbers} шт.</span>
                                        </Typography>
                                    ))
                                }
                            </Box>
                            <Box>
                                <Box style={{ marginBottom: 20 }}>
                                    <Typography variant='span'>Сума:
                                        {getFullPrice()} $
                                    </Typography>
                                    <Typography variant='p' className={waiter === '' ? 'error' : 'hide'}>Виберіть офіціанта</Typography>    
                                </Box>
                                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button variant='contained' onClick={handleClose}>Видалити</Button>
                                    <Button variant='contained' onClick={toCalculate}>Розрахувати</Button>
                                </Box>
                            </Box>
                    </CardContent>
                    : <CardContent>
                        <Typography paragraph>Замовлень немає!</Typography>
                    </CardContent>}       
                </Collapse>      
            </Card>
        </Grid>
            <CheckWithdrawalWindow open={open} handleClose={handleClose} check={getOrderInfo()} />    
    </React.Fragment>
  )
}