import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import HomePage from "./Components/Home/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Main from "./Components/Main/Main";
import FoodComp from "./Components/Home/FoodComp";
import ScheduleComp from "./Components/Home/ScheduleComp";
import CartComp from "./Components/Home/CartComp";
import CircularProgress from "@mui/material/CircularProgress";
import Cart from "./Classes/Cart";
import User from "./Classes/User";
import Schedule from "./Classes/Schedule";
import Recipe from "./Classes/Recipe";
import { BASE_URL } from "./constants";
import WelcomeComp from "./Components/Home/WelcomeComp";
import MyAccountComp from "./Components/AppBar/MyAccountComp"; 


function App() {
  axios.defaults.withCredentials = true;
  const [cart, setCart] = useState(new Cart());
  const [schedule, setSchedule] = useState(new Schedule(""));
  const [user, setUser] = useState(new User());
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [foodData, setFoodData] = useState(new Recipe());
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);

  const updateServings = async (item: any) => {
    setSelectedItems((prev: any) => {
      return prev.map((foodItem: any) => {
        if (foodItem.id === item.foodItem.id) {
          return {
            ...foodItem,
            servings: foodItem.servings - 1,
          };
        } else {
          return foodItem;
        }
      });
    });
  };

  //Initialize user
  useEffect(() => {
    if (!user.initialized) {
      user.getCurrent().then((res) => {
        if (res) {
          setUser(res);
          setSchedule(new Schedule(res.email));
        }
      });
    }
  }, []);

  //Fetch food data from api
  useEffect(() => {
    foodData.fetchData(filterOptions).then((res) => {
      setFoodData(res);
      setLoading(false);
    });
  }, [filterOptions, user]);

  //##############################################  Components ##############################################
  type ProtectedRouteProps = {
    user: User;
    element: JSX.Element;
  };

  const ProtectedRoute = ({ user, element }: ProtectedRouteProps) => {
    if (!user || !user.verified) {
      return <Navigate to="/" />;
    }
    return element;
  };

  function LoadingIndicator() {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  const homePageGenerator = (component: any) => {
    return (
      <HomePage
        userData={user}
        setUser={setUser}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        setFilterOptions={setFilterOptions}
        filterOptions={filterOptions}
        setLoading={setLoading}
        component={component}
        setPageLoading={setPageLoading}
        cart = {cart}
      />
    );
  };

  return (
    <>
      {pageLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  user && user.verified ? (
                    <Navigate to="/HomePage" />
                  ) : (
                    <Main
                      setUser={setUser}
                      userData={user}
                      setPageLoading={setPageLoading}
                    />
                  )
                }
              />
              <Route
                path="/HomePage/"
                element={
                  <ProtectedRoute
                    user={user}
                    element={homePageGenerator(<WelcomeComp username={user.username} />)}
                  />
                }
              />
              <Route
                path="/HomePage/food"
                element={
                  <ProtectedRoute
                    user={user}
                    element={homePageGenerator(
                      <FoodComp
                        cart={cart}
                        setSelectedItems={setSelectedItems}
                        foodData={foodData.recipies}
                        loading={loading}
                      />
                    )}
                  />
                }
              />
              <Route
                path="/HomePage/schedule"
                element={
                  <ProtectedRoute
                    user={user}
                    element={homePageGenerator(
                      <ScheduleComp
                        schedule={schedule}
                        setSelectedItems={setSelectedItems}
                        updateServings={updateServings}
                      />
                    )}
                  />
                }
              />
              <Route
                path="/HomePage/cart"
                element={
                  <ProtectedRoute
                    user={user}
                    element={homePageGenerator(
                      <CartComp cart={cart} />
                    )}
                  />
                }
                />
                <Route
                  path="/HomePage/myaccount"
                  element={
                    <ProtectedRoute
                      user={user}
                      element={<MyAccountComp userData={user} />}
                    />
                  }
                />
                
              </Routes>
            <ToastContainer position="top-center" autoClose={3000} />
          </Router>
        </>
      )}
    </>
  );
}

export default App;
