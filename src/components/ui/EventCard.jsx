import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const EventCard = ({ picture, title, category,Date,last_date ,content}) => {
  console.log("the content is ",content)
  return (
    <Card
      sx={{ width: "100%", maxWidth: 345 }}
      className="!bg-amber-200 dark:!bg-slate-600 !text-black dark:!text-white !shadow-lg !shadow-black dark:!shadow-white cursor-pointer hover:!scale-105 !transition-all !duration-150 my-4"
    >
      <CardMedia
        component="img"
        alt="green iguana"
        sx={{
          height: 230,
          width: "100%", // or a fixed value like 200
          objectFit: "cover", // or 'contain'
        }}
        image={picture}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className=" !text-black dark:!text-white"
        >
          Category : {category}
          
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className=" !text-black dark:!text-white"
        >
          
          Date : {Date}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          className=" !text-black dark:!text-white"
        >
          
          Deadline : {last_date}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <Link to="/eventdesc" state={{ content }}>Learn More</Link>
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
