import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import {  signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase"; 
import { showToast, showError } from "../../helper/toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});



// Sign In Component
export const SignIn = () => {
    const navigate = useNavigate();
  
    const handleSignIn = async (values) => {
      try {
        await signInWithEmailAndPassword(auth, values.email, values.password);
        showToast("Signed in successfully");
        navigate('/')
      } catch (error) {
        showError(error.message);
      }
    };
  
    return (
      <Box p={4}>
        <Typography variant="h5" mb={2}>Sign In</Typography>
        <Formik initialValues={{ email: "", password: "" }} validationSchema={SignInSchema} onSubmit={handleSignIn}>
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field as={TextField} name="email" label="Email" error={!!errors.email && touched.email} helperText={touched.email && errors.email} />
              <Field as={TextField} name="password" type="password" label="Password" error={!!errors.password && touched.password} helperText={touched.password && errors.password} />
              <Button variant="contained" type="submit">Sign In</Button>
              <Typography mt={2}>
                Don't have an account?{' '}
                <Link component="button" variant="body2" onClick={() => navigate("/auth/signup")}>Sign Up</Link>
              </Typography>
            </Form>
          )}
        </Formik>
      </Box>
    );
  };
  