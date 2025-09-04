import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import Rating from "@mui/material/Rating";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const FeedModal = ({ open, setOpen, id }) => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  async function feedback(i) {
    setLoading(true);
    try {
      let res = await fetch(
        `http://localhost:3000/api/events/${i}/getFeedback`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      );
      let ans = await res.json();

      setData(ans);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open && id) {
      feedback(id);
    }
  }, [open]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      {/* <button
        className="w-fit p-2 bg-cyan-500 text-black rounded-lg"
        onClick={handleOpen}
      >
        See Feedback
      </button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { backgroundColor: "transparent" }, // transparent backdrop
        }}
      >
        <Box sx={style}>
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "grey.600",
            }}
          >
            <ClearIcon />
          </IconButton>

          {loading ? (
            <CircularProgress />
          ) : (
            <div>
              <h2 className="text-xl font-bold ">{data.event}</h2>
              {data.results?.length > 0 ? (
                <>
                  {" "}
                  {data.results.map((items, index) => (
                    <div key={index} className="border p-2 my-2">
                      <p>{items.comment}</p>
                      <Rating
                        name="rating"
                        value={items.rating} // ✅ match backend field
                        readOnly
                      />
                    </div>
                  ))}
                </>
              ) : (
                <p className="capitalize text-red-500">No Ratings given yet</p>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default FeedModal;
