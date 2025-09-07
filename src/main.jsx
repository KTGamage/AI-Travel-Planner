// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import CreateTrip from "./create-trip/index.jsx";
// import Header from "./components/custom/Header";
// import { Toaster } from "./components/ui/sonner";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import Viewtrip from "./view-trip/[tripId]";
// import MyTrips from "./my-trips";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/create-trip",
//     element: <CreateTrip />,
//   },
//   {
//     path: "/view-trip/:tripId",
//     element: <Viewtrip/>
//   },
//   {
//     path: '/my-trips',
//     element: <MyTrips/>
//   }
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
//       <Header />
//       <Toaster />
//       <RouterProvider router={router} />
//     </GoogleOAuthProvider>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom"; // Changed from createBrowserRouter to createHashRouter
import CreateTrip from "./create-trip/index.jsx";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Viewtrip from "./view-trip/[tripId]";
import MyTrips from "./my-trips";

// Changed from createBrowserRouter to createHashRouter for GitHub Pages compatibility
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <Viewtrip/>
  },
  {
    path: '/my-trips',
    element: <MyTrips/>
  }
]);

// const isProduction = import.meta.env.PROD;
// const redirectUri = isProduction 
//   ? 'https://ktgamage.github.io/AI-Travel-Planner/' 
//   : 'http://localhost:5173';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
     onScriptLoadError={() => console.log("Google OAuth script failed to load")}
  onScriptLoadSuccess={() => console.log("Google OAuth script loaded successfully")}
    >
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);