import AppBarComp from "../AppBar/AppBarComp";
import FoodBlock from "./FoodBlock";
import AboutUsBlock from "./AboutUsBlock";
import FoodScheduleBlock from "./FoodScheduleBlock";
import User from "../../Classes/User";

const containerStyle = {
  flexDirection: "column",
  justifyContent: "center",
  minHeight: "100vh", // Adjust the height as needed
  minWidth: "100vw",
};

interface MainProps {
  userData: User;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Main({ userData, setUser, setPageLoading }: MainProps) {
  return (
    <div>
      <AppBarComp
        userData={userData}
        setUser={setUser}
        setPageLoading={setPageLoading}
      />
      <FoodBlock />
      <AboutUsBlock />
      <FoodScheduleBlock />
    </div>
  );
}

export default Main;
