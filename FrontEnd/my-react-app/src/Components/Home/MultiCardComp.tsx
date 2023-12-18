import React, { useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import FoodComp from "./FoodDetailsComp"; // Import your FoodDetailsComp component
import Cart from "../../Classes/Cart";
import FoodItem from "../../Classes/FoodItem";

interface MultiCardCompProps {
  foodItem: FoodItem;
  cart: Cart;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
}

export default function MultiCardComp({
  foodItem,
  cart,
  setSelectedItems,
}: MultiCardCompProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    setShowDetails(!showDetails);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleCartClick = () => {
    cart.addToCart(foodItem);
    setSelectedItems((prev: any) => [...prev, foodItem]);
  };

  return (
    <div>
      <Card
        sx={{
          width: 400,
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CardActionArea onClick={handleCardClick}>
          {isHovered && foodItem.video ? (
            <video
              width="100%"
              height="200"
              autoPlay
              loop
              style={{ objectFit: "cover" }}
              muted
              src={foodItem.video}
            ></video>
          ) : (
            <CardMedia
              component="img"
              height="200"
              src={foodItem.image}
              alt={foodItem.name}
              sx={{
                objectFit: "cover",
              }}
            />
          )}
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              {foodItem.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            onClick={handleCartClick}
          >
            Add to Cart
          </Button>
          <IconButton size="small" color="primary" onClick={handleCardClick}>
            <i className="fas fa-info-circle"></i>
          </IconButton>
        </CardActions>
      </Card>
      <Modal
        open={showDetails}
        onClose={handleClose}
        aria-labelledby="food-details-modal"
        aria-describedby="food-details-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modal-content">
          <IconButton
            aria-label="Close"
            color="primary"
            sx={{ position: "absolute", top: "10px", right: "10px" }}
            onClick={handleClose}
          >
            <i className="fas fa-times"></i>
          </IconButton>
          <FoodComp foodItem={foodItem} popupVisible={showDetails} />
        </div>
      </Modal>
    </div>
  );
}
