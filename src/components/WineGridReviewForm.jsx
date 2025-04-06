import React from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

export default function WineTastingGridForm({ onSubmit }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const [FIvalue, setFIvalue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setFIvalue(event.target.value === '' ? '' : Number(event.target.value));
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Wine Tasting Grid Review</h2>

      <TextField
        id="WineName"
        label="Wine Name"
        placeholder="Enter the wine name"
        {...register("WineName", { required: "Wine name is required" })}
        error={!!errors.WineName}
        helperText={errors.WineName?.message}
      />



      <Typography id="FI" gutterBottom>
        Flavor Intensity: {FIvalue}
      </Typography>
      <Slider
        id="FlavorIntensity"
        label="Flavor Intensity"
        placeholder="Rate the flavor intensity (0-10)"
        valueLabelDisplay="auto"
        {...register("FlavorIntensity", { required: "Flavor intensity is required" })}
        onChange={handleChange}
        min={0}
        max={10}
        defaultValue={0}
      />



      <TextField
        id="Vintage"
        label="Vintage"
        type="number"
        placeholder="Enter the vintage year"
        {...register("Vintage", { required: "Vintage is required" })}
        error={!!errors.Vintage}
        helperText={errors.Vintage?.message}
      />

      <TextField
        id="Appearance"
        label="Appearance"
        placeholder="Describe the wine's appearance"
        multiline
        {...register("Appearance")}
      />

      <TextField
        id="Nose"
        label="Nose"
        placeholder="Describe the wine's aroma"
        multiline
        {...register("Nose")}
      />

      <TextField
        id="Palate"
        label="Palate"
        placeholder="Describe the wine's taste"
        multiline
        {...register("Palate")}
      />

      <TextField
        id="Conclusion"
        label="Conclusion"
        placeholder="Summarize your thoughts on the wine"
        multiline
        {...register("Conclusion")}
      />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Submit Review
      </Button>
    </Box>
  );
}