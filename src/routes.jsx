import { createBrowserRouter } from "react-router-dom";
import Page from "./pages";
import PrivateRoute from "./helper/PrivateRoute";

// let user

const Routes = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true, // Ensures the homepage is the default child
        element: <Page.HomePage />,
      },
    ],
  },
  { path: "/auth/signin", element: <Page.SignIn /> },
  { path: "/auth/signup", element: <Page.SignUp /> },
  { path: "/auth/reset-password", element: <Page.ResetPassword /> },
  { path: "/auth/profile-setup", element: <Page.ProfileSetup /> },
  {
    path: "/:category",
    element: <Page.ProductList />, // No need for `children` if there's only one component
  },
  {
    path: "/product/:id",
    element: <Page.Product />,
  },
  {
    path: "/cart",
    element: (
      <PrivateRoute>
        <Page.Cart />
      </PrivateRoute>
    ),
  },
  {
    path: "/auth",
    element: <Page.AuthPage />,
  },
]);

export default Routes;
