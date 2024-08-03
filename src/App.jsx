import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Provider, useDispatch } from "react-redux";
import appStore from "./Utils/appStore";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Utils/firebase";
import { addUser, removeUser } from "./Utils/userSlice";

const AuthProvider = ({ children }) => {
  const dispatchAction = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const name = user.displayName;
        const email = user.email;
        dispatchAction(addUser({ uid: uid, name: name, email: email }));
        navigate("/browse");
      } else {
        dispatchAction(removeUser());
        navigate("/");
      }
    });
  }, []);

  return children;
};

function App() {
  return (
    <Provider store={appStore}>
      <AuthProvider>
        <Navbar />
        <Outlet />
      </AuthProvider>
    </Provider>
  );
}

export default App;
