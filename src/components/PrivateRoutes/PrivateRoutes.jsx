import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes({ auth }) {
  if(!auth) {
    return <Navigate to="/login" />
  }
  return (
    <Outlet /> 
  );
};