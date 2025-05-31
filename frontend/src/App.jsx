import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import MyPlantPage from "./pages/userPages/MyPlantPage";
import UserLoginPage from "./pages/userPages/userLoginPage";
import UserSignupPage from "./pages/userPages/userSignUpPage";
import UserPlantDetailPage from "./pages/userPages/userPlantDetailPage";
import { UserAddPlantPage } from "./pages/userPages/userAddPlantPage";
import { UserEditAccountPage } from "./pages/userPages/userEditAccPage";
import { UserCommunityFeedPage } from "./pages/userPages/userCommunityFeed";
import UserPlantEditDetailPage from "./pages/userPages/userEditPlantDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyPlantPage />,
  },
  {
    path: "/login",
    element: <UserLoginPage />,
  },
  {
    path: "/signup",
    element: <UserSignupPage />,
  },
  {
    path: "/plant-detail/:plantId",
    element: <UserPlantDetailPage />,
  },
  {
    path: "/add-plant",
    element: <UserAddPlantPage />,
  },
  {
    path: "/edit-account",
    element: <UserEditAccountPage />,
  },
  {
    path: "/community",
    element: <UserCommunityFeedPage />,
  },
  {
    path: "/plant-edit",
    element: <UserPlantEditDetailPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
