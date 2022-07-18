import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { auth } from '@/firebase/firebase';
import { useStoreNotes } from '@/stores/storeNotes';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import router from '@/router';

export const useStoreAuth = defineStore('storeAuth', () => {
  // state
  // idはfireStoreで自動で割り振られるもの
  const userInfo = ref({ id: '', email: '' });

  // Actoin
  const initAuth = () => {
    // auth情報に変更があったときに呼ばれるフックを登録
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('==StateChange== user logged in: ', user);
        userInfo.value.id = user.uid;
        userInfo.value.email = user.email!;

        const { initNotes } = useStoreNotes();
        initNotes();

        router.push({ name: 'notes' });
      }
      // userがnullのときはsigned outしたとき
      else {
        // User is signed out
        console.log('==StateChange==, user signed out: ', user);

        userInfo.value.id = '';
        userInfo.value.email = '';

        const { clearNotes } = useStoreNotes();
        clearNotes();

        router.replace({ name: 'auth' });
      }
    });
  };

  const registerUser = (email: string, password: string) => {
    console.log('registerUser');

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log('register user: ', user);
      })
      .catch((error) => {
        console.log(`error message:${error.message}`);
      });
  };

  const loginUser = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log('login user: ', user);
      })
      .catch((error) => {
        console.log(`error message:${error.message}`);
      });
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // console.log('User signed out');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return { registerUser, loginUser, logoutUser, initAuth, userInfo };
});
