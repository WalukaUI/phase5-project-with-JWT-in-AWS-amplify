import MainContainer from "./Components/Maindiv"
import { useAuth } from "react-oidc-context";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "2kih0h4ra0c1ognli9tomv1hs7";
    const logoutUri = "https://google.com";
    const cognitoDomain = "https://us-east-2smuhwfuds.auth.us-east-2.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        {/* <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre> */}
        <MainContainer/>
      </div>
    );
  }



return (
    <div className="popupbox">
      <div className="popupinner">
        <div className="confirmNumDiv">
        <h4>Please confirm</h4>
                      <p>
                Please confirm sign out action.
              </p><hr/>
                            <div className="spinner">
                <div class="lds-spinner">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
                            <div>
                <button type="submit" className="btn btn-success formSubBtn" onClick={() => signOutRedirect()}>
                  Confirm
                </button>
                <button
                  className="btn btn-warning formSubBtn"
                  onClick={() => auth.signinRedirect()}
                >
                  Cancel
                </button>
              </div>
        </div>
      </div>
    </div>
  );
}

export default App;