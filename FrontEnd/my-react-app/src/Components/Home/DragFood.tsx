import React from "react";
import { useDrag } from "react-dnd";
import  FoodItem from "../../Classes/FoodItem";
import Badge from "@mui/material/Badge";

export const ItemTypes = {
  FOOD_ITEM: "foodItem",
};

interface DragFoodProps {
  foodItem: FoodItem;
  handleRemove: (item: any) => void;
}

export default function DragFood({ foodItem, handleRemove }: DragFoodProps) {
  const [, ref] = useDrag({
    type: ItemTypes.FOOD_ITEM,
    item: { foodItem },
  });

  return (
    <div ref={ref} className="selected-item">
      <Badge badgeContent={foodItem.servings} color="error">
        <img
          src={foodItem.image}
          alt={foodItem.name}
          className="floating-item"
        />
      </Badge>
      <span className="item-name">{foodItem.name}</span>
      <button
        onClick={() => {
          handleRemove(foodItem);
        }}
        className="remove-item"
      >
        X
      </button>
    </div>
  );
}
