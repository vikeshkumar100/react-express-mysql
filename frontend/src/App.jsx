import React from "react";
import SignupPage from "./components/signup";
import Home from "./components/home";
const App = () => {
  return (
    <>
      <div className="bg-background text-foreground">
        <Home />
        <SignupPage />
      </div>
    </>
  );
};

export default App;
