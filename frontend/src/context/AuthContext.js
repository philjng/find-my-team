import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { getUser } from "../actions/user";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    setLoading(true);
    return auth
      .signInWithEmailAndPassword(email, password)
      .finally(setLoading(false));
  }

  function logout() {
    setLoading(true);
    return auth.signOut().finally(setLoading(false));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      dispatch(getUser(user.uid));
      setLoading(false);
    });

    return unsubscribe;
  }, [dispatch]);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
