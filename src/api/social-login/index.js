import { GraphRequestManager } from 'react-native-fbsdk-next';
import {LoginManager, Profile, AccessToken, GraphRequest} from 'react-native-fbsdk-next';
import {
    GoogleSignin,
    statusCodes,
  } from '@react-native-google-signin/google-signin';


GoogleSignin.configure({
scopes: [], // what API you want to access on behalf of the user, default is email and profile
webClientId:
    '328528134728-g8krsnl0ropo9u4b1vss2dnq4q7gcbjg.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
});
export const loginWithFacebook = async () => {
  try {
    let result = await LoginManager.logInWithPermissions(['public_profile','email']);

    if (result?.isCancelled) {
      console.log('Login cancelled');
    } else {
      console.log(
        'Login success with permissions: ' +
          result.grantedPermissions.toString(),
      );
      let accessTokenObj = await AccessToken.getCurrentAccessToken();
      let userData = await Profile.getCurrentProfile();

      return {accessToken: accessTokenObj.accessToken,user:userData};
    }
  } catch (error) {
    console.log(error);
  }
};

export const getMyFbUserInfo = (accessToken, responseInfoCallback) => {
    const infoRequest = new GraphRequest(
      '/me',
      {
        httpMethod: 'GET',
        version: 'v12.0',
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'email',
          },
        },
      },
      responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  export const loginWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      return userInfo;
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      console.log(error);
      return error;
    }
  };
  
  export const checkIsGoogleLogined = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const currentUser = await GoogleSignin.getCurrentUser();
      return currentUser;
    } else {
      return null;
    }
  };
  
  export const googleSignOut = async () => {
    try {
      await GoogleSignin.signOut();
      return true;
    } catch (error) {
      console.error(error);
    }
  };
  