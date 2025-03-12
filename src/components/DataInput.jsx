import { Box, TextField } from '@mui/material'
import React from 'react'

const DataInput = ({value, onChange}) => {
  return (
    <Box my={2}>
      <TextField
      label="Patient Data"
      multiline={true}
      rows={8}
      fullWidth
      variant="outlined"
      value={value}
      onChange={onChange}
      placeholder="Paste patient data here"
      >
      </TextField>
    </Box>
  )
}

export default DataInput
