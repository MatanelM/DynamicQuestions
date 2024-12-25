import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const primaryColor = "#1589e3";
const buttonBackround = "#90EE90"

const InputContainer = ({ handleSubmit }) => {
  const [option, setOption] = useState("upload");
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [fileName, setFileName] = useState(""); 

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setFile(null);
    setLink("");
    setFileName(""); 
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "");
  };

  const handleUpload = () => {
    handleSubmit(file, option, link);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        border: `1px solid ${primaryColor}`,
        borderRadius: 1,
        width: "clamp(250px, 40vw, 70vw)",
        margin: "50px auto",
      }}
    >
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="upload-type"
          name="upload-type"
          value={option}
          onChange={handleOptionChange}
        >
          <FormControlLabel
            value="upload"
            control={<Radio sx={{color: primaryColor, '&.Mui-checked':{color: primaryColor}}} />} // Use primary color for Radio
            label="Upload"
          />
          <FormControlLabel
            value="link"
            control={<Radio sx={{color: primaryColor, '&.Mui-checked':{color: primaryColor}}} />} // Use primary color for Radio
            label="Link"
          />
        </RadioGroup>
      </FormControl>

      <Box sx={{ width: "100%", marginY: 2 }}>
        {option === "upload" ? (
          <FormControl sx={{ width: "100%", display: "grid", placeItems: "center" }}>
            <InputLabel htmlFor="upload-input"></InputLabel>
            <Input
              id="upload-input"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="upload-input">
              <Button
                component="span"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ color: primaryColor, borderColor: primaryColor }} // Use primary color for button
              >
                Upload PDF File
              </Button>
            </label>
              {fileName && (
                 <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {`File: ${fileName}`}
                 </Typography>
                )}
                <Typography variant="h6" component="span" style={{color:"#444", fontSize: "11px"}}>
                  *Max filesize: 20MB
                </Typography>
          </FormControl>
        ) : (
          <TextField
            fullWidth
            label="Enter a link"
            variant="outlined"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            sx={{'& label.Mui-focused': {color: primaryColor},
                '& .MuiInput-underline:after': {borderBottomColor: primaryColor},
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {borderColor: primaryColor},
                  '&:hover fieldset': {borderColor: primaryColor},
                  '&.Mui-focused fieldset': {borderColor: primaryColor},
              }}}
          />
        )}
      </Box>

      <Button variant="contained" color="primary"  onClick={handleUpload} sx={{backgroundColor: buttonBackround, '&:hover': { backgroundColor: buttonBackround }}}>
        Submit
      </Button>
    </Box>
  );
};

export default InputContainer;
