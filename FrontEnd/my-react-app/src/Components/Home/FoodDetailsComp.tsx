import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useRef } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import FoodItem  from "../../Classes/FoodItem";

interface denseTableProps {
  foodItem: FoodItem;
}

const DenseTable = ({ foodItem }: denseTableProps) => {
  const row = foodItem.nutrition as any;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell> (per serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Fiber&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow
            key={foodItem.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {foodItem.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbohydrates}</TableCell>
            <TableCell align="right">{row.fiber}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface FoodDetailsCompProps {
  foodItem: FoodItem;
  popupVisible: boolean;
}

export default function FoodDetailsComp({
  foodItem,
  popupVisible,
}: FoodDetailsCompProps) {
  const popupContentRef = useRef(null) as any;
  const pictureRef = useRef(null) as any;

  useEffect(() => {
    if (pictureRef.current === null || popupContentRef.current === null) return;

    const pictureHeight = pictureRef.current.clientHeight;
    const pictureWidth = pictureRef.current.clientWidth;

    // Handle scroll event inside the pop-up content
    const handleScroll = () => {
      if (popupContentRef.current) {
        const scrollY = popupContentRef.current.scrollTop;
        //New height and width of the image for zooming effect
        const newHeight = pictureHeight - +scrollY / 2 + "px";
        const newWidth = pictureWidth - +scrollY / 2 + "px";
        //Opacity of the image for fading effect
        const opacity = 1 - +scrollY / 700 + "";

        //Set the new height, width and opacity of the image
        pictureRef.current.style.height = newHeight;
        pictureRef.current.style.width = newWidth;
        pictureRef.current.style.opacity = opacity;
      }
    };

    if (popupVisible) {
      // Attach the scroll event listener when the pop-up is visible
      popupContentRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (popupVisible) {
        try {
          popupContentRef.current.removeEventListener("scroll", handleScroll);
        } catch (err) {
          console.log(err);
        }
      }
    };
  }, [popupVisible]);

  return (
    <div
      style={{
        width: "600px",
        height: "600px",
        overflow: "scroll",
        padding: "20px",
        background: "#f4f4f4",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      }}
      ref={popupContentRef}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={foodItem.image}
          alt="Zoomed"
          ref={pictureRef}
          style={{
            maxWidth: "100%",
            borderRadius: "8px",
          }}
        />
        <h1 style={{ marginTop: "10px", textAlign: "center" }}>
          {foodItem.name}
        </h1>
      </div>
      <hr style={{ margin: "20px 0" }} />
      <Typography variant="h6">Nutrients</Typography>
      <div style={{ overflow: "hidden" }}>{DenseTable({ foodItem })}</div>
      <hr style={{ margin: "20px 0" }} />
      <Typography variant="h6">Ingredients</Typography>
      <div style={{ overflow: "hidden", textAlign: "left" }}>
        {foodItem.ingredients.map((item, index) => {
          return (
            <p
              style={{
                fontSize: "smaller",
                margin: "8px 0",
              }}
              key={index}
            >
              {item.raw_text}
            </p>
          );
        })}
      </div>
      <hr style={{ margin: "20px 0" }} />
      <Typography variant="h6">Rating</Typography>
      {/* Food Rating Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Rating
          name="half-rating-read"
          value={Math.floor(foodItem.rating.score * 5)}
          size="large"
          precision={0.1}
          readOnly
        />
      </div>
      <hr style={{ margin: "20px 0" }} />
      <Typography variant="h6">Instructions</Typography>
      <div style={{ overflow: "hidden", textAlign: "left" }}>
        {foodItem.instructions.map((item: any, index: number) => {
          return (
            <p
              style={{
                fontSize: "smaller",
                margin: "8px 0",
              }}
              key={index}
            >
              {index + 1}. {item.display_text}
            </p>
          );
        })}
      </div>
      <hr style={{ margin: "20px 0" }} />
      {foodItem.video && (
        <div>
          <Typography variant="h6">Guide</Typography>
          <video
            width="100%"
            controls
            style={{
              borderRadius: "8px",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <source src={foodItem.video} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
