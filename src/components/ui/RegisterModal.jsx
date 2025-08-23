import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { use } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1 / 2,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RegisterModal = ({ open, setOpen }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ph,setPh] = useState(false);
  const [name,setName] = useState(false);
  const [email,setEmail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if(formData.get("name").length==0){
        setName(true);
    }
    if(formData.get("email").length==0){
        setEmail(true);
    }
    if(formData.get("phone").length<10){
        setPh(true);
    }
    console.log({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    });
    setName(false);
    setEmail(false);
    setPh(false);
    e.currentTarget.reset();
  };
  return (
    <div>
      <button
        type="button"
        className="bg-cyan-600 p-3 rounded-lg cursor-pointer font-bold text-xl hover:bg-green-500 hover:transition-all hover:duration-150"
        onClick={handleOpen}
      >
        {" "}
        Register
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="!text-center">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="!my-4"
          >
            Register Here
          </Typography>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <TextField
              id="name"
              name="name"
              error={name}
              helperText={name ? "Please enter a valid phone number" : ""}
              label="Name"
              variant="outlined"
              fullWidth
              
            />
            
            <TextField
              id="email"
              helperText={email ? "Please enter a valid phone number" : ""}
              name="email"
              error={email}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="phone"
              error={ph}
              helperText={ph ? "Please enter a valid phone number" : ""}
              name="phone"
              label="Phone"
              type="tel"
              variant="outlined"
              fullWidth
            />

            <Button type="submit" variant="contained" className="!mt-4">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default RegisterModal;
