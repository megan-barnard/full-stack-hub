import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"; // Also updateProfile
import { auth, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

// Generate random data for accounts
import { faker } from '@faker-js/faker';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [ currentUser, setCurrentUser ] = useState('');
  const [ userAuthId, setUserAuthId ] = useState('');
  const [ userLoading, setUserLoading ] = useState(false);
  const [ userEditLoading, setUserEditLoading ] = useState(false);
  const [ editSuccess, setEditSuccess ] = useState('');
  const [ editError, setEditError ] = useState('');
  const [ userError, setUserError ] = useState('');
  const [ userList, setUserList ] = useState('');
  const [ loadingUserList, setLoadingUserList ] = useState(false);

  useEffect(() => {
    if (userAuthId) getUserDetails(userAuthId);
  }, [userAuthId]);
  
  onAuthStateChanged(auth, (user) => {
    if (user && !userLoading) setUserAuthId(user.uid);
  });

  const generateRandomUser = () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const randomInt = Math.floor(Math.random() * 1000);
    const numberOfLanguages = Math.floor(Math.random() * 10);
    const randomLanguages = ['HTML','CSS','C','Java','Python','C++','C#','Visual Basic','JavaScript','PHP','SQL','Assembly language','Groovy','React', 'Vue.js','.NET','Nim','Opa','Rust', 'Ruby','Z++','JSON','TypeScript'];
    let languages = '';
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
    const cohort = 'CD-WD-12A';
    const additionalData = {languages, color, avatarSrc, bannerSrc, bio, cohort, facebookUrl, linkedinUrl, instagramUrl, githubUrl, websiteUrl};

    registerNewUser({ name, username, email, password, additionalData });
  }

  // Login user
  const loginCurrentUser = async ({email, password}) => {
    setUserLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user;
      getUserDetails(user.uid);
    } catch (error) {
      setUserError(error.message);
      setUserLoading(false);
    }
  };

  // Get user details
  const getUserDetails = (userId) => {
    setUserLoading(true);
    fetch(`/api/get-user/${userId}`)
    .then(res => res.json())
    .then(({data}) => {
      setUserLoading(false);
      setCurrentUser(data);
    })
    .catch((error) => {
      setUserError(error.message);
      setUserLoading(false);
    });
  };

  // Logout current user
	const logoutCurrentUser = async () => {
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
      setCurrentUser(data);
      setUserAuthId(newUser);
      setUserLoading(false);
    })
    .catch((error) => {
      setUserError(error.message);
      setUserLoading(false);
    });
  };

  // Upload avatar and banner images
  const uploadAvatar = (userData) => {
    if (!userData.newAvatarSrc) return uploadBanner(userData);
    const imageType = userData.newAvatarSrc.type.split("/").pop().toLowerCase();
    const imageFileName = `${faker.datatype.uuid()}.${imageType}`;
    if (imageType !== 'jpeg' && imageType !== 'jpg' && imageType !== 'png') {
      setEditSuccess('failed');
      setEditError('Image must be a jpeg, jpg, or png.');
      return;
    }
    const storageRef = ref(storage, `/avatars/${imageFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, userData.newAvatarSrc);
    uploadTask.on("state_changed", 
      (snapshot) => {}, 
      (error) => setEditError('Failed to upload photo'),
      () => getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        userData.avatarSrc = url;
        uploadBanner(userData);
      })
    );
  };

  const uploadBanner = (userData) => {
    if (!userData.newBannerSrc) return updateUserAccount(userData);
    const imageType = userData.newBannerSrc.type.split("/").pop().toLowerCase();
    const imageFileName = `${faker.datatype.uuid()}.${imageType}`;
    if (imageType !== 'jpeg' && imageType !== 'jpg' && imageType !== 'png') {
      setEditSuccess('failed');
      setEditError('Image must be a jpeg, jpg, or png.');
      return;
    }
    const storageRef = ref(storage, `/avatars/${imageFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, userData.newBannerSrc);
    uploadTask.on("state_changed", 
      (snapshot) => {}, 
      (error) => setEditError('Failed to upload photo'),
      () => getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        userData.bannerSrc = url;
        updateUserAccount(userData);
      })
    );
  };

   // Update user account 
  const updateUserAccount = (userData) => {
    setUserEditLoading(true);
    setEditSuccess('');
    fetch(`/api/update-user/${userData.uid}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify(userData),
    })
    .then(res => res.json())
    .then(({data}) => {
      setUserEditLoading(false);
      setEditSuccess('Success');
    })
    .catch((error) => {
      setUserEditLoading(false);
      setEditSuccess('Failed');
      setEditError('Failed to update');
    });
  };

  // Follow user
  const followUser = async ({ uid, followId, followerState }) => {
    fetch("/api/follow-user", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({ uid, followId, followerState }),
    })
    .then(res => res.json())
    .then(() => {})
    .catch((error) => {});
  };

  const getUsersByIds = ({ userIds }) => {
    setLoadingUserList(true);
    fetch("/api/get-users-by-ids", {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Accept': 'application/json',},
      body: JSON.stringify({ userIds }),
    })
    .then(res => res.json())
    .then(({data}) => {
      setUserList(data);
      setLoadingUserList(false);
    })
    .catch((error) => {
      setLoadingUserList(false);
    });
  };

  const getAllUsers = ({ lastUserId }) => {
    setLoadingUserList(true);
    const userSearch = lastUserId ? `/api/get-users?lastVisibleId=${lastUserId}` : '/api/get-users';
    fetch(userSearch)
    .then(res => res.json())
    .then(({data}) => {
      const newUserList = lastUserId ? [ ...userList, ...data ] : [ ...data ];
      setUserList(newUserList);
      setLoadingUserList(false);
    })
    .catch((error) => {
      setUserError(error.message);
      setLoadingUserList(false);
    });
  };

	return (
		<UserContext.Provider value={{ 
      // Current user
      currentUser, 
      userAuthId, 
      userLoading, 
      userError, 
      setUserError,
      // Current user actions 
      loginCurrentUser, 
      logoutCurrentUser, 
      getUserDetails,
      registerNewUser,
      followUser,
      uploadAvatar,
      uploadBanner,
      updateUserAccount,
      userEditLoading, setUserEditLoading,
      editSuccess, setEditSuccess,
      editError, setEditError,
      // Users
      userList,
      setUserList,
      loadingUserList,
      getUsersByIds,
      getAllUsers,

      generateRandomUser
    }}>
			{children}
		</UserContext.Provider>
	);
};