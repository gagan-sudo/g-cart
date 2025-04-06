import React, { useEffect, useState } from "react";
import * as firebaseui from "firebaseui";
import { auth } from "../utils/firebase";
import {
  EmailAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import "firebaseui/dist/firebaseui.css";
import Layout from "../layout";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [showUI, setShowUI] = useState(false); // Only show Firebase UI if not logged in

  


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const name = user.displayName || user.email;
        setDisplayName(name);
        console.log("✅ Logged-in as:", name);
        navigate("/"); // Redirect if already logged in
      } else {
        setShowUI(true); // Only show UI if not logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!showUI) return;

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);

    const uiConfig = {
      signInOptions: [
        EmailAuthProvider.PROVIDER_ID,
      ],
      signInFlow: "popup",
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          const user = authResult.user;
          if (user) {
            const name = user.displayName || user.email;
            setDisplayName(name);
            console.log("🎉 Signed in:", name);
            navigate("/"); // Redirect after login
          }
          return false;
        },
      },
    };

    ui.start("#firebaseui-auth-container", uiConfig);

    return () => {
      ui.reset();
    };
  }, [showUI, navigate]);

  return (
    <Layout>
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {displayName ? `Welcome, ${displayName}` : "Sign Up or Sign In with Email"}
        </h2>
        {showUI && <div id="firebaseui-auth-container" />}
      </div>
    </Layout>
  );
};

export default AuthPage;
