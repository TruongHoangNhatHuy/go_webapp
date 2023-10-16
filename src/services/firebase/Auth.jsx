// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_0Qx1owRzJxbtyVaAWHZYdc5Ot6w7Rcw",
  authDomain: "goapp-453be.firebaseapp.com",
  projectId: "goapp-453be",
  storageBucket: "goapp-453be.appspot.com",
  messagingSenderId: "650109837523",
  appId: "1:650109837523:web:3ce27f9c30780267e8b426"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'it';

export const GoogleLogin = () => {
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        console.log(auth.currentUser.uid);
        return true;
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'signup',
    signInOptions: [
      GoogleAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '<your-tos-url>', // Terms of service url.
    privacyPolicyUrl: '<your-privacy-policy-url>' // Privacy policy url.
  };

  ui.start('#firebaseui-auth-container', uiConfig);

  return (
    <div id="firebaseui-auth-container"></div>
  )
}