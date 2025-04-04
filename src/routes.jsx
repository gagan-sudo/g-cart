import { createBrowserRouter } from "react-router-dom";
import Page from "./pages";

const Routes = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true, // Ensures the homepage is the default child
                element: <Page.HomePage />
            }
        ]
    },
    {
        path: "/:category",
        element: <Page.ProductList /> // No need for `children` if there's only one component
    },
    {
        path: "/product/:id",
        element: <Page.Product />
    }
]);

export default Routes;
