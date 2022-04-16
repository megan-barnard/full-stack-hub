import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState('');
  const [ userAuthId, setUserAuthId ] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [ userLoading, setUserLoading ] = useState('none');
  const [ userError, setUserError ] = useState('');

  useEffect(() => {
    console.log('userAuthId:',userAuthId);
    if (userAuthId) getUserDetails(userAuthId);
    // const storedId = localStorage.getItem('wearableCart');
    // if (storedCart) {
    //   setCart(JSON.parse(storedCart));
    // } 
  }, [userAuthId]);
  
  onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChanged');
    setUserLoading(true);
    if (user) {
      setUserAuthId(user.uid);
    } else {
      console.log('User is signed out');
      setUserLoading(false);
    }
  });


  const loginCurrentUser = async ({email, password}) => {
    console.log('login');
    setUserLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      getUserDetails(user.uid);
    } catch (error) {
      console.log('error loginCurrentUser:', error);
      setUserError(error.message);
      setUserLoading(false);
    }
  };

  const getUserDetails = (userId) => {
    console.log('test uid', userId);
    setUserLoading(true);
    fetch(`/api/get-user/${userId}`)
    .then(res => res.json())
    .then(({data}) => {
      console.log('getUserDetails:', data);
      setUserLoading(false);
      setCurrentUser(data);
    })
    .catch((error) => {
      console.log('error getUserDetails:', error);
      setUserError(error.message);
      setUserLoading(false);
    });
  };

	const logoutCurrentUser = async () => {
    console.log('logout');
    await signOut(auth);
    setCurrentUser('');
    setUserAuthId('');
  };

  const registerNewUser = async ({ name, email, password }) => {
    setUserLoading(true);
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      const uid = newUser.user.uid;
      createNewUserAccount(newUser, name, email, uid);
    } catch (error) {
      setUserError(error.message);
      console.log('error registerNewUser:',error);
      setUserLoading(false);
    }
  };

  const createNewUserAccount = (newUser, name, email, uid) => {
    fetch("/api/new-user", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({name, email, uid}),
    })
    .then(res => res.json())
    .then(({data}) => {
      console.log('createNewUserAccount',data);
      setUserAuthId(newUser);
      setCurrentUser(data);
      setUserLoading(false);
    })
    .catch((error) => {
      setUserError(error.message);
      console.log('error createNewUserAccount:', error.message);
      setUserLoading(false);
    });
  };

	return (
		<CurrentUserContext.Provider value={{ 
      currentUser, 
      userAuthId, 
      userLoading, 
      userError, 
      setUserError, 
      loginCurrentUser, 
      logoutCurrentUser, 
      registerNewUser 
    }}>
			{children}
		</CurrentUserContext.Provider>
	);
};





