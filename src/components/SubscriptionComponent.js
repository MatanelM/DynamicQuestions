import React, { useState } from "react";
import { Box, TextField, Button, Typography, styled } from "@mui/material";
import { blue, green } from "@mui/material/colors";

const primaryColor = blue[500];
const secondaryColor = green[200];
const cardBackground = "#E0FFFF";
const buttonColor = "#1589e3";
const StyledFooter = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(4),
  
}));


const StyledSubscribeContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
  backgroundColor: cardBackground,
  width: "100%",
  maxWidth: "400px",
}));


const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: "100%",
  '& label.Mui-focused': {
    color: primaryColor,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: primaryColor,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: primaryColor,
    },
    '&:hover fieldset': {
      borderColor: primaryColor,
    },
    '&.Mui-focused fieldset': {
      borderColor: primaryColor,
    },
  },
}));

const StyledButton = styled(Button)(({theme}) =>({
  backgroundColor: secondaryColor,
  '&:hover': {
      backgroundColor: green[300],
  }
}));


const SubscriptionComponent = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage("");

    try {
      const response = await fetch("https://landa.wiki/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
          setMessage("Successfully subscribed!");
          setEmail("");
        } else {
        const errorData = await response.json();
        console.error("Subscription failed", errorData);
        setError(true);
        setMessage(errorData.message || "Subscription failed");
      }
    } catch (error) {
        console.error("Error subscribing:", error);
        setError(true);
        setMessage("An error occurred during subscription.");
    }
  };

  return (
      <StyledFooter>
          <StyledSubscribeContainer>
          <Typography variant="h5" style={{textAlign:"center"}} id="subscribeHeader" >Want to get notified about AI tools?</Typography>
              <Typography variant="body1" style={{marginBottom:"10px"}} id="subscribeParagraph" >Subscribe now and never miss an update!</Typography>
              <StyledForm onSubmit={handleSubmit}>
              <StyledTextField
                label="Enter your email"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                error={error}
              />
                <StyledButton type="submit" style={{backgroundColor: buttonColor}}variant="contained">
                      Subscribe
                </StyledButton>
              </StyledForm>
               {message && (
                        <Typography variant="body2" color={error ? "error" : "success"} sx={{ marginTop: 1}}>
                            {message}
                        </Typography>
               )}
        </StyledSubscribeContainer>
        <Typography variant="h6" >Contact</Typography>
         <Typography variant="body2" >Email: Matanelm12321@gmail.com</Typography>
        </StyledFooter>
  );
};

export default SubscriptionComponent;