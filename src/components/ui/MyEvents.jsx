import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { motion, useInView } from "motion/react";
import toast, { Toaster } from "react-hot-toast";

import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

import { useSelector } from "react-redux";

const MyEvents = () => {
  const sectionRef = useRef(null);
  const isinView = useInView(sectionRef, { once: true });
  const [loading, setLoading] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const [events, setEvents] = useState([]);

  async function getEvents() {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/api/events/${user.id}/myevents`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      setEvents(data);
      if (data.length == 0) {
        toast.info("No Events Found");
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getEvents();
  
    
  }, [])

  function formatDateTime(isoString) {
  const dateObj = new Date(isoString);

  // Format date
  const date = dateObj.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format time
  const time = dateObj.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return { date, time };
}
  

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));



  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isinView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" p-10 sm:p-20 min-h-[80vh]  bg-gradient-to-r from-yellow-400 to-amber-200 dark:bg-slate-700 dark:bg-none rounded-lg border"
    >
      <Toaster position="top-center" reverseOrder={false} />

      <div className="my-[20%] sm:my-30 border !text-xl">
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh", // keeps it vertically centered
              width: "100%",
            }}
          >
            <CircularProgress
              sx={{
                fontSize: { xs: 50, sm: 70, md: 90 }, // scales on different breakpoints
              }}
              size={80} // base size
              thickness={5} // thicker stroke
            />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Event</StyledTableCell>
                  <StyledTableCell align="right">Date & Time</StyledTableCell>
                  <StyledTableCell align="right">Venue</StyledTableCell>
                  <StyledTableCell align="right">Category</StyledTableCell>
                  <StyledTableCell align="right">Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events?.map((row) => (
                  <StyledTableRow key={row.rid} className="dark:!bg-gray-300">
                    <StyledTableCell className="px-10 sm:!px-6 !py-4 !font-bold  sm:!text-xl hover:!text-blue-500 hover:!cursor-pointer " component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell className="table" align="right">
                      {formatDateTime(row.date).date+" "+formatDateTime(row.date).time}
                    </StyledTableCell>
                    <StyledTableCell className="table" align="right">{row.venue}</StyledTableCell>
                    <StyledTableCell className="table" align="right">{row.category}</StyledTableCell>
                    <StyledTableCell className="table" align="right">
                      Registered
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
    </motion.section>
  );
};

export default MyEvents;
