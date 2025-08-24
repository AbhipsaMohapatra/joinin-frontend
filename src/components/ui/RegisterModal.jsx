import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";




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

const RegisterModal = ({ open, setOpen , id,toast}) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [form, setForm] = useState({name:"",email:"",phone:""})
  const [error,setError] = useState({flag:false,message:""})
  const {user,token} = useSelector((state)=>state.auth);
  

  const handleChange = (e)=>{
    e.preventDefault();
    setForm({...form,[e.target.name]:e.target.value});
    setError({flag:false,message:""})

  }

   const handleSubmit = async (e) => {
    e.preventDefault();
    if(form.name=="" || form.email=="" || form.phone==""){
      setError({flag:true,message:"Please Fill All The Feilds"});
      return;
    }
    if(form.phone.trim().length!=10){
      setError({flag:true,message:"Check your phone number"})
      return;
    }
    try{
       const res= await fetch(`http://localhost:3000/api/events/${id}/register`,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${token}`},body:JSON.stringify(form)});

    const data = await res.json();
    console.log(data)

    
     
      if(data.message==="Registration Successful"){
         toast.success(data.message);

      }
      else{
        toast.error(data.message)
      }
    

    }catch(e){
      toast.error(e);


    }
    finally{
      setForm({ name: "", email: "", phone: "" });

    }

   


    

    

    // Reset state after submit
    
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
              value={form.name}
              onChange={handleChange}
              
              
              label="Name"
              variant="outlined"
              fullWidth
              
            />
            
            <TextField
              id="email"
              
              name="email"
              value={form.email}
              onChange={handleChange}
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="phone"
              value={form.phone}
              onChange={handleChange}
              
              name="phone"
              label="Phone"
              type="tel"
              variant="outlined"
              fullWidth
            />
            {error.flag&& <p className="text-red-500 text-xl">{error.message}</p>}

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
