import { 
  getAuth, 
  signInWithPopup, 
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignInWithEmail,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmail,
  User
} from 'firebase/auth';
import { app } from './firebase';

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async (): Promise<User> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw new Error(`Failed to sign in: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Sign in with Email
export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const result = await firebaseSignInWithEmail(auth, email, password);
    return result.user;
  } catch (error) {
    throw new Error(`Failed to sign in: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Sign up with Email
export const signUpWithEmail = async (email: string, password: string): Promise<User> => {
  try {
    const result = await firebaseCreateUserWithEmail(auth, email, password);
    return result.user;
  } catch (error) {
    throw new Error(`Failed to sign up: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Sign out
export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error(`Failed to sign out: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Made with Bob
