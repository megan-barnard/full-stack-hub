import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase-config";

// Generate random data for accounts
import { faker } from '@faker-js/faker';

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState('');
  const [ userAuthId, setUserAuthId ] = useState('');
  const [ userLoading, setUserLoading ] = useState(false);
  const [ userError, setUserError ] = useState('');

  useEffect(() => {
    console.log('userAuthId:',userAuthId);
    if (userAuthId) getUserDetails(userAuthId);
  }, [userAuthId]);
  
  onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChanged');
    if (user && !userLoading) setUserAuthId(user.uid);
  });

  const generateRandomUser = () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const randomInt = Math.floor(Math.random() * 1000);

    const numberOfLanguages = Math.floor(Math.random() * 10);
    const randomLanguages = ['HTML','CSS','C','Java','Python','C++','C#','Visual Basic','JavaScript','PHP','SQL','Assembly language','Groovy','React', 'Vue.js','.NET','Nim','Opa','Rust', 'Ruby','Z++','JSON','TypeScript'];
    let languages = '';
    console.log('test1',numberOfLanguages,randomLanguages);
    for (let i = 0; i < numberOfLanguages; i++){
      let randomLanguage = Math.floor(Math.random() * randomLanguages.length);
      if (!languages.includes(randomLanguages[randomLanguage])) {
        languages = languages ? languages+', '+randomLanguages[randomLanguage] : randomLanguages[randomLanguage];
      }
    }

    const name = `${firstName} ${lastName}`;
    const email = `${firstName}.${lastName}${randomInt}@test.com`;
    const username = firstName + randomInt;
    const password = 'test123';
    const color = faker.internet.color();
    const avatarSrc = faker.image.avatar();
    const bannerSrc = faker.image.nature();
    const bio = faker.hacker.phrase();
    const facebookUrl = 'www.facebook.com';
    const linkedinUrl = 'www.linkedin.com';
    const instagramUrl = 'www.instagram.com';
    const githubUrl = 'www.github.com';
    const websiteUrl = 'www.google.com';
    const additionalData = {languages, color, avatarSrc, bannerSrc, bio, facebookUrl, linkedinUrl, instagramUrl, githubUrl, websiteUrl};
    console.log({ name, username, email, password, color, avatarSrc, bannerSrc, bio, languages});

    registerNewUser({ name, username, email, password, additionalData });
  }

  // Login user
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

  // Get user details
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

  // Logout current user
	const logoutCurrentUser = async () => {
    console.log('logout');
    await signOut(auth);
    setCurrentUser('');
    setUserAuthId('');
  };

  // Create new user auth in the database
  const registerNewUser = async ({ name, username, email, password, additionalData}) => {
    setUserLoading(true);
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      const uid = newUser.user.uid;
      createNewUserAccount(newUser, name, username, email, uid, additionalData);
    } catch (error) {
      setUserError(error.message);
      console.log('error registerNewUser:',error);
      setUserLoading(false);
    }
  };

  // Create new user account in the database
  const createNewUserAccount = (newUser, name, username, email, uid, additionalData) => {
    fetch("/api/new-user", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({name, username, email, uid, additionalData}),
    })
    .then(res => res.json())
    .then(({data}) => {
      console.log('createNewUserAccount',data);
      setCurrentUser(data);
      setUserAuthId(newUser);
      setUserLoading(false);
    })
    .catch((error) => {
      setUserError(error.message);
      console.log('error createNewUserAccount:', error.message);
      setUserLoading(false);
    });
  };

  // Follow user
  const followUser = async ({uid, followId, followerState}) => {
    fetch("/api/follow-user", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({uid, followId, followerState}),
    })
    .then(res => res.json())
    .then(({data}) => {
      
    })
    .catch((error) => {
      console.log(error.message);
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
      getUserDetails,
      registerNewUser,
      followUser,

      generateRandomUser
    }}>
			{children}
		</CurrentUserContext.Provider>
	);
};





