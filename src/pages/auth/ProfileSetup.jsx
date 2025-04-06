import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import {  updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase"; 
import { showToast, showError } from "../../helper/toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ProfileSchema = Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").required("Required"),
  });

// Profile Setup Component
export const ProfileSetup = () => {
    const handleProfileUpdate = async (values) => {
      try {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName: values.name });
          showToast("Profile updated successfully");
        }
      } catch (error) {
        showError(error.message);
      }
    };
  
    return (
      <Box p={4}>
        <Typography variant="h5" mb={2}>Profile Setup</Typography>
        <Formik initialValues={{ name: "" }} validationSchema={ProfileSchema} onSubmit={handleProfileUpdate}>
          {({ errors, touched }) => (
            <Form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Field as={TextField} name="name" label="Full Name" error={!!errors.name && touched.name} helperText={touched.name && errors.name} />
              <Button variant="contained" type="submit">Save Profile</Button>
            </Form>
          )}
        </Formik>
      </Box>
    );
  };