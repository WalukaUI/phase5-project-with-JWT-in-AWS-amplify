import MainContainer from "./Components/Maindiv"
import { useAuth } from "react-oidc-context";


function App() {
  const auth = useAuth();

    const signOutRedirect = () => {
    const clientId = "2kih0h4ra0c1ognli9tomv1hs7";
    const logoutUri = "<logout uri>";
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
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>
    
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  
  return (
    <div>
      {/* <MainContainer /> */}
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );

}

export default App;
