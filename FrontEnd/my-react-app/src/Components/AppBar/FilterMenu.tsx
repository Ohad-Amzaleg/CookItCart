import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {styled } from "@mui/system";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Rating from "@mui/material/Rating";

const FilterMenuContainer = styled(Paper)(({ theme }: any) => ({
  position: "absolute",
  top: "100%",
  right: 0,
  width: "300px",
  padding: theme.spacing(2),
  boxShadow: theme.shadows[5],
  borderRadius: "8px",
  backgroundColor: "white",
  zIndex: 1000, // Increase the zIndex value as needed
}));

const ingredients = [
  { name: "Salt", selected: false },
  { name: "Pepper", selected: false },
  { name: "Olive Oil", selected: false },
  { name: "Garlic", selected: false },
  { name: "Onion", selected: false },
  { name: "Tomato", selected: false },
  { name: "Basil", selected: false },
  { name: "Oregano", selected: false },
  { name: "Paprika", selected: false },
  { name: "Cumin", selected: false },
  { name: "Ginger", selected: false },
  { name: "Lemon", selected: false },
  { name: "Soy Sauce", selected: false },
  { name: "Sugar", selected: false },
  { name: "Eggs", selected: false },
  { name: "Milk", selected: false },
  { name: "Cheese", selected: false },
  { name: "Chicken", selected: false },
  { name: "Beef", selected: false },
  { name: "Fish", selected: false },
  { name: "Rice", selected: false },
  { name: "Pasta", selected: false },
  { name: "Bread", selected: false },
  { name: "Potatoes", selected: false },
  { name: "Carrots", selected: false },
  { name: "Spinach", selected: false },
  { name: "Avocado", selected: false },
  { name: "Mushrooms", selected: false },
  { name: "Beans", selected: false },
  { name: "Corn", selected: false },
];

const cookingTime = [
  { value: 15, name: "Under 15 Min", selected: false },
  { value: 30, name: "Under 30 Min", selected: false },
  { value: 45, name: "Under 45 Min", selected: false },
];

let rating = 2;

interface FilterMenuProps {
  filterOptions: any;
  setFilterOptions: React.Dispatch<React.SetStateAction<any>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isFilterMenuOpen: boolean;
  setIsFilterMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function FilterMenu({
  filterOptions,
  setFilterOptions,
  setLoading,
  isFilterMenuOpen,
  setIsFilterMenuOpen,
}: FilterMenuProps) {
  const [ingredientList, setIngredientList] = useState(ingredients);
  const [searchTerm, setSearchTerm] = useState("");
  const [cookingTimeList, setCookingTimeList] = useState(cookingTime);
  const [ratingValue, setRatingValue] = useState(rating);
  const [apply, setApply] = useState(false);

  const handleRatingChange = (event: any, newValue: any) => {
    rating = newValue;
    setRatingValue(newValue);
    setApply(true);
  };

  const handleIngredientSelect = (index: number) => {
    const updatedList = [...ingredientList];
    updatedList[index].selected = !updatedList[index].selected;
    setIngredientList(updatedList);
    setApply(true);
  };

  const handleCookingTimeSelect = (index: number) => {
    cookingTimeList.forEach((item, pos) => {
      pos === index
        ? (item.selected = !item.selected)
        : (item.selected = false);
    });
    const updatedList = [...cookingTimeList];
    setCookingTimeList(updatedList);
    setApply(true);
  };

  const handleFilterApply = () => {
    const ingredient = ingredientList
      .filter((item) => item.selected)
      .map((item) => item.name);
    const cookingTime = cookingTimeList
      .filter((item) => item.selected)
      .map((item) => item.value);

    setFilterOptions((prev: any) => {
      return {
        ...prev,
        Rating: ratingValue,
        Ingredients: ingredient,
        cookingTime: cookingTime,
      };
    });

    setLoading(true);
    setApply(false);
  };

  const handleSearchClick = () => {
    setFilterOptions((prev: any) => {
      return { ...prev, searchTerm: searchTerm };
    });
    setLoading(true);
  };

  return (
    <Box sx={{ width: 400 }}>
      <Toolbar>
        <Grid
          spacing={{ xs: 2, md: 2 }}
          columns={{ xs: 4, sm: 4, md: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            margin: "auto",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <TextField
              variant="outlined"
              label="Search..."
              size="small"
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                marginRight: "1rem",
              }}
              value={searchTerm}
              data-testid="filters-search-textField"
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setApply(true);
              }}
            />

            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: "20px" }}
              data-testid="filters-searchBtn"
              onClick={() => {
                handleSearchClick();
              }}
            >
              <SearchIcon />
            </Button>
            {apply && (
              <Button
                variant="contained"
                color="primary"
                style={{ borderRadius: "20px" }}
                data-testid="filters-searchBtn"
                onClick={handleFilterApply}
              >
                Apply
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: "20px" }}
              data-testid="filters-searchBtn"
              onClick={() => {
                setIsFilterMenuOpen(!isFilterMenuOpen);
              }}
            >
              <FilterListIcon />
            </Button>
            {isFilterMenuOpen && (
              <FilterMenuContainer>
                <Box sx={{ width: 250, marginRight: "4rem" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    data-testid="filters-rating-title"
                  >
                    Rating
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={ratingValue}
                    size="large"
                    onChange={(event, newValue) => {
                      handleRatingChange(event, newValue);
                    }}
                  />
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    data-testid="filters-rating-title"
                  >
                    Cooking Time
                  </Typography>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 4, md: 12 }}
                  >
                    {cookingTimeList.map((time, index) => (
                      <Chip
                        key={index}
                        label={time.name}
                        variant={time.selected ? "filled" : "outlined"}
                        color={time.selected ? "primary" : "default"}
                        onClick={() => handleCookingTimeSelect(index)}
                        sx={{ m: 1 }}
                      />
                    ))}
                  </Grid>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    data-testid="filters-rating-title"
                  >
                    Ingredients
                  </Typography>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 4, sm: 4, md: 12 }}
                  >
                    {ingredientList.map((ingredient, index) => (
                      <Chip
                        key={index}
                        label={ingredient.name}
                        variant={ingredient.selected ? "filled" : "outlined"}
                        color={ingredient.selected ? "primary" : "default"}
                        onClick={() => handleIngredientSelect(index)}
                        sx={{ m: 1 }}
                      />
                    ))}
                  </Grid>
                </Box>
              </FilterMenuContainer>
            )}
          </div>
        </Grid>
      </Toolbar>
    </Box>
  );
}

export default FilterMenu;
