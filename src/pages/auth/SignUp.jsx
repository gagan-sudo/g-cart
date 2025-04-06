import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";
import { showToast, showError } from "../../helper/toast";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

// 🛡️ Yup validation schema with full name
const SignUpSchema = Yup.object().shape({
  fullName: Yup.string().min(2, "Too Short!").required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password too short").required("Password is required"),
});

// 📦 Create Firestore user document
const createUserData = async (user, fullName) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    fullName,
    email: user.email,
    createdAt: new Date(),
    cart: [],
  });
};

export const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      // Update display name in Firebase Auth
      await updateProfile(user, {
        displayName: values.fullName,
      });

      // Store extra data in Firestore
      await createUserData(user, values.fullName);

      showToast("Signed up successfully");
      navigate('/');
    } catch (error) {
      showError(error.message);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h5" mb={2}>Sign Up</Typography>
      <Formik
        initialValues={{ fullName: "", email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({ errors, touched }) => (
          <Form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field
              as={TextField}
              name="fullName"
              label="Full Name"
              error={!!errors.fullName && touched.fullName}
              helperText={touched.fullName && errors.fullName}
            />
            <Field
              as={TextField}
              name="email"
              label="Email"
              error={!!errors.email && touched.email}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              name="password"
              type="password"
              label="Password"
              error={!!errors.password && touched.password}
              helperText={touched.password && errors.password}
            />
            <Button variant="contained" type="submit">Sign Up</Button>
            <Typography mt={2}>
              Already have an account?{' '}
              <Link component="button" variant="body2" onClick={() => navigate("/auth/signin")}>
                Sign In
              </Link>
            </Typography>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
