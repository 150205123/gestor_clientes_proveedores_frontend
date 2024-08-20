import React, { useEffect } from "react";
import Layout from "../Layout";
import FormAddEntidad from "../../components/entidad/FormAddEntidad";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const AddEntidad = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
   
  }, [isError, user, navigate]);
  return (
    <Layout>
      <FormAddEntidad />
    </Layout>
  );
};

export default AddEntidad;
