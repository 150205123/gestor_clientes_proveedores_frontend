import React, { useEffect } from "react";
import Layout from "../Layout";
import EntidadList from "../../components/entidad/EntidadList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const Entidades = () => {
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
            <EntidadList />
        </Layout>
    );
};

export default Entidades;
