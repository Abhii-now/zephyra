import FileGrid from "FileGrid/FileGrid";
import "./App.css";
import FileUpload from "./FileUpload/FileUpload";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";

import FileDownload from "FileDownload/FileDownload";
import AlertNotification from "AlertNotification";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { setAccessToken } from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import { store } from "app/store";
import { jwtDecode } from "jwt-decode";

function App() {
  const { getAccessTokenSilently, user } = useAuth0();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const getUserMetadata = async () => {
      console.log(user);
      const userToken = await getAccessTokenSilently({
        authorizationParams: {
          scope: "read:users read:current_user update:current_user_metadata",
          audience: "https://dev-u3pvqte1l7ripqyb.us.auth0.com/api/v2/",
        },
        detailedResponse: true,
      });
      const userDetailsByIdUrl = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/api/v2/users/${user.sub}`;

      const metadataResponse = await fetch(userDetailsByIdUrl, {
        headers: {
          Authorization: `Bearer ${userToken.access_token}`,
        },
      });
      const token = await getAccessTokenSilently();
      const metadata = await metadataResponse.json();
      setPermissions(metadata.app_metadata.roles);
      dispatch(setAccessToken(token));
      setLoading(false);
    };
    // const state = store.getState();

    // const token = state.auth.accessToken;
    getUserMetadata();
  }, [getAccessTokenSilently, dispatch]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <AlertNotification />
      <Routes>
        <Route
          path="/:token?"
          element={
            <div>
              {permissions.includes("Regular User") && <FileDownload />}
              {permissions.includes("Regular User") && <FileUpload />}
              <FileGrid />
            </div>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
