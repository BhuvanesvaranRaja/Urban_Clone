import { useEffect } from "react";
import "./App.css";
import MainRoutes from "./Routes/MainRoutes";
import LandingPage_Navbar from "./Components/LandingPg_Navbar";
import { gapi } from "gapi-script";
function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "1095168063845-kehnkv6r9kg7nc94id7tpm69sv0lafjf.apps.googleusercontent.com",
        scope: "email",
        prompt: "select_account",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <div className="App">
      {/* <LandingPage_Navbar /> */}

      <MainRoutes />
    </div>
  );
}

export default App;
