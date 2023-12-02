import React, { useEffect, useState } from "react";
import { Container, styled } from "@mui/system";
import NavBarComp from "./NavBarComp";
import AppBarComp from "../AppBar/AppBarComp";
import FloatingBarComp from "./FloatingBarComp";
import User from "../../Classes/User";

// ################ Styled Components ################

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "300px",
  color: "black",
});

const textFieldStyle = {
  background: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
  border: "1px solid #ccc", // Add a border for separation
  borderRadius: "4px", // Add rounded corners
  color: "#333", // Dark text color
};

const containerStyle: React.CSSProperties = {
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh", // Adjust the height as needed
  minWidth: "100vw",
};
interface HomePageProps {
  userData: User;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  selectedItems: any;
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>;
  filterOptions: any;
  setFilterOptions: React.Dispatch<React.SetStateAction<any>>;
  component: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// ################ Functions ################
function HomePage({
  userData,
  setUser,
  selectedItems,
  setSelectedItems,
  filterOptions,
  setFilterOptions,
  component,
  setLoading,
  setPageLoading,
}: HomePageProps) {
  return (
    <div style={containerStyle}>
      <AppBarComp
        userData={userData}
        setUser={setUser}
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
        setLoading={setLoading}
        setPageLoading={setPageLoading}
      />
      <NavBarComp />
      {component}
      {
        <FloatingBarComp
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
        />
      }
    </div>
  );
}

export default HomePage;
