import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import MultiCardComp from "./MultiCardComp";
import { useState } from "react";
import { Typography } from "@mui/material";
import FoodItem  from "../../Classes/FoodItem";
import  Cart  from "../../Classes/Cart";

interface FoodCompProps {
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  cart: Cart;
  foodData: any;
  loading: boolean;
}

export default function FoodComp({
  setSelectedItems,
  cart,
  foodData,
  loading,
}: FoodCompProps) {
  const [noResult, setNoResult] = useState(false);

  useEffect(() => {
    if (foodData.length === 0) {
      setNoResult(true);
    } else {
      setNoResult(false);
    }
  }, [foodData]);

  function NoResult() {
    return (
      <Box sx={{ flexGrow: 1, paddingLeft: 8 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "left",
            paddingTop: 2,
            fontWeight: "bold",
          }}
        >
          No results found
          <span role="img" aria-label="sad">
            😢
          </span>
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, paddingLeft: 8 }}>
      {noResult ? (
        <NoResult />
      ) : (
        <>
          <Typography
            variant="h3"
            sx={{
              textAlign: "left",
              paddingTop: 2,
              fontWeight: "bold",
            }}
          >
            Food of the day
          </Typography>
          <Grid container spacing={1}>
            {(loading ? Array.from(new Array(20)) : foodData).map(
              (item: FoodItem, index: number) => (
                <Grid item key={index} xs={true} sm={true} md={true} lg={true}>
                  <Box
                    key={index}
                    sx={{
                      my: 5,
                      justifyContent: "center",
                    }}
                  >
                    {item ? (
                      <MultiCardComp
                        cart={cart}
                        foodItem={item}
                        setSelectedItems={setSelectedItems}
                      />
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={400}
                        height={200}
                      />
                    )}
                  </Box>
                </Grid>
              )
            )}
          </Grid>
        </>
      )}
    </Box>
  );
}
