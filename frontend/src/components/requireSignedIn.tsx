import React, {useEffect} from 'react';

type RequireSignedInProps = {
  children: React.ReactNode;
}

const RequireSignedIn = ({children}: RequireSignedInProps) => {
  const [signedIn, setSignedIn] = React.useState(false);

  useEffect(() => {
    fetch("/api/isloggedin").then((res) => {
      return res.json()
    }).then((isLoggedIn) => {
      setSignedIn(isLoggedIn)

      if (!isLoggedIn) {
        window.location.href = "/login"
      }
    }).catch((err) => {
      console.log(err);
      setSignedIn(false)

      window.location.href = "/login"
    })
  }, []);

  return (
    <>
      {signedIn ? children : (
        <div>
          Loading...
        </div>
      )}
    </>
  );
};

export default RequireSignedIn;
