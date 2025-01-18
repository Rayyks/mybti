import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const PublicRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, loading, navigate]);

  return <>{!loading && children}</>;
};

PublicRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoutes;
