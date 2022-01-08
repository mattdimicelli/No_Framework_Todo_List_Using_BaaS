import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import 'firebase/compat/auth';
import firebaseConfig from './FirebaseConfig.js';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc, enableIndexedDbPersistence, getDoc } from "firebase/firestore";
import domController from './DomController';
import logic from './Logic';


const app = firebase.initializeApp(firebaseConfig);
// app is a container-like object that stores common configuration 
// and shares authentification across Firebase services

const auth = getAuth();
let userId;
let userDisplayName;

onAuthStateChanged(auth, user => {
  if (user) {
    // user is signed in 
    const { uid, displayName } = user;
    console.log(displayName);
    userId = uid;
    userDisplayName = displayName;
    domController.initializeEventListeners(auth);
    loadToDoListDataFromFirestore();
    domController.hideFirebaseUI();
    domController.showToDoApp();
    domController.showCurrentUsersNameOnLogOutBtn(displayName);
  } else {
    // user is signed out
    startFirebaseUI();
    domController.showFirebaseUI();
    domController.hideToDoApp();
  }
});

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.disableAutoSignIn();

function startFirebaseUI() {
  ui.start('#firebaseui-auth-container', {
    callbacks: {
      signInSuccessWithAuthResult: function() {
        return false;  // means that the page will not be automatically redirected
      },
      uiShown: function() {
        // the widget is rendered.  hide the loader
        document.getElementById('loader').style.display = 'none';
      },
      signInFailure: function(error) {
        console.error(error);
      },
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters: {
          // Forces account selection even when one account
          // is available.
          prompt: 'select_account',
        },
      },
    ],
    // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '#',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
          window.location.assign('#');
        }
  });  
}



const db = getFirestore();

enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
// Subsequent queries will use persistence, if it was enabled successfully

async function saveToFirestoreDB(currentList, nextListId, lists) {
    try {
        await setDoc(doc(db, "data", userId), {
          currentList: JSON.stringify(currentList),
          lists: JSON.stringify(lists),
          nextListId: JSON.stringify(nextListId),
        });
        console.log("data saved to Firestore");
      } catch (e) {
        console.error("Error updating data in Firestore: ", e);
      }
}

async function loadToDoListDataFromFirestore() {
  try {
    const docRef = doc(db, "data", userId);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
        console.log("there's stuff in the Firestore");
        let { currentList, lists, nextListId } = docSnap.data();
        currentList = JSON.parse(currentList);
        lists = JSON.parse(lists);
        nextListId = JSON.parse(nextListId);
        logic.updateData({ currentList, lists, nextListId });
        domController.renderDataFromFirestore();
    } else {
        console.log('nothing in Firestore');
        logic.setDefaultList();
    }
  } catch(error) {
    console.error('Error loading data from Firestore', error);
  }
}


export { saveToFirestoreDB, loadToDoListDataFromFirestore };