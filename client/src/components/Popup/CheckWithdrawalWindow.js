import { Box, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material'
import React from 'react'
import { Button } from 'react-bootstrap'

export default function CheckWithdrawalWindow({ open, handleClose, check }) {
  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{display: 'flex', justifyContent: 'space-between'}}>
              <Typography variant='span'>Чек: {check.table}</Typography>
              <Button variant="contained" style={{marginLeft: 'auto'}}>Друк</Button>
        </DialogTitle>  
        <DialogContent style={{width: 500}}>
            <Box>
                  {check.order.map((element) => (
                        <Typography key={element._id} paragraph style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant='span'>{element.name}</Typography>
                            <Typography variant='span'>{element.numbers} шт.</Typography>
                            <Typography variant='span'>{element.numbers * element.price} $</Typography>
                        </Typography>
                    ))
                }
            </Box>
            <Box>
                <Typography variant='h6' style={{fontSize: 16, marginBottom: 16}}>Офіціант: {check.waiter}</Typography>
            </Box>
            <Box>
                <Typography paragraph style={{display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
                    <Typography variant='span' style={{width: 41 + '%'}}>Сума до сплати:</Typography>
                    <Typography variant='span' style={{borderBottom: '3px dashed rgb(212, 212, 212)', width: 44 + '%'}}></Typography>
                    <Typography variant='span' style={{width: 15 + '%', textAlign: 'right'}}>{check.sum} $</Typography>
                </Typography>
            </Box>
            <Typography paragraph style={{textAlign: 'center'}}>! НЕ ФІСКАЛЬНИЙ !</Typography>
        </DialogContent>
    </Dialog>
  )
}
