
import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import {  sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../utils/firebase"; 
import { showToast, showError } from "../../helper/toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ResetSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
  });

// Reset Password Component
export const ResetPassword = () => {
    const handleReset = async (values) => {
      try {
        await sendPasswordResetEmail(auth, values.email);
        showToast("Password reset link sent");
      } catch (error) {
        showError(error.message);
      }
    };
  
    return (
      <Box p={4}>
        <Typography variant="h5" mb={2}>Reset Password</Typography>
        <Formik initialValues={{ email: "" }} validationSchema={ResetSchema} onSubmit={handleReset}>
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field as={TextField} name="email" label="Email" error={!!errors.email && touched.email} helperText={touched.email && errors.email} />
              <Button variant="contained" type="submit">Send Reset Link</Button>
            </Form>
          )}
        </Formik>
      </Box>
    );
  };