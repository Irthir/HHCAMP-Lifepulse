import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";

import PatientHome from "./pages/patient/PatientHome";
import Communities from "./pages/patient/Communities";
import CarePath from "./pages/patient/CarePath";
import HealthRecord from "./pages/patient/HealthRecord";

import ProPatients from "./pages/pro/ProPatients";
import ProCommunities from "./pages/pro/ProCommunities";

import AidantHome from "./pages/aidant/AidantHome";
import AidantCommunities from "./pages/aidant/AidantCommunities";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },

  // Patient
  { path: "/patient/home", element: <PatientHome /> },
  { path: "/patient/communities", element: <Communities /> },
  { path: "/patient/care", element: <CarePath /> },
  { path: "/patient/health", element: <HealthRecord /> },

  // Pro
  { path: "/pro/patients", element: <ProPatients /> },
  { path: "/pro/communities", element: <ProCommunities /> },

  // Aidant
  { path: "/aidant/home", element: <AidantHome /> },
  { path: "/aidant/communities", element: <AidantCommunities /> }
]);