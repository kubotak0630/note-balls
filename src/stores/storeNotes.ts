import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { db } from '@/firebase/firebase';
import { useStoreAuth } from '@/stores/storeAuth';
import { storeToRefs } from 'pinia';
import {
  collection,
  getDocs,
  onSnapshot,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';

import type { CollectionReference, DocumentData, Unsubscribe } from 'firebase/firestore';
import type { NoteT } from '@/components/Notes/NoteV.vue';

let notesCollectionRef: CollectionReference<DocumentData>;
let unsubscribe: Unsubscribe | null = null;

export const useStoreNotes = defineStore('storeNotes', () => {
  const notes = ref<NoteT[]>([]);
  const nowLoaded = ref(false);

  // Action
  const initNotes = () => {
    const { userInfo } = storeToRefs(useStoreAuth());
    // notesCollectionRef = collection(db, 'users', 'Jz02tNdxMNMgWACdCHXEIQfWdTw2', 'notes');
    notesCollectionRef = collection(db, 'users', userInfo.value.id, 'notes');
    getNotes();
  };

  const getNotes = async () => {
    nowLoaded.value = true;

    const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(
      notesCollectionQuery,
      (querySnapshot) => {
        const newNotes: NoteT[] = [];
        querySnapshot.forEach((doc) => {
          newNotes.push({ id: doc.id, content: doc.data().content, date: doc.data().date });
        });

        notes.value = newNotes;
        nowLoaded.value = false;
      },
      (error) => {
        console.log('onSnapshot error.message: ', error.message);
      }
    );
  };

  const addNote = async (newNoteContent: string) => {
    console.log('call addNote');
    const date = new Date().getTime().toString();

    // const note = { id: id, content: newNoteContent };
    // notes.value.unshift(note);

    // setDocは手動でIDを設定する。自動にしたい場合はaddDoc
    // await setDoc(doc(db, 'notes', id), {
    //   content: newNoteContent,
    //   id: id,
    // });

    const docRef = await addDoc(notesCollectionRef, {
      content: newNoteContent,
      date: date,
    });
  };

  const deleteNote = async (id: string) => {
    await deleteDoc(doc(notesCollectionRef, id));
    // notes.value = notes.value.filter((note) => {
    //   return note.id !== id;
    // });
  };

  // logoutでコールされる
  const clearNotes = () => {
    notes.value = [];

    // 購読解除
    if (unsubscribe) {
      console.log('unsubscribe');
      unsubscribe();
    }
  };

  const getNoteContent = (id: string) => {
    return computed(() => {
      const targets = notes.value.filter((note) => {
        return note.id === id;
      });
      return targets[0].content;
    });
  };

  const updateContent = async (id: string, content: string) => {
    // const washingtonRef = doc(db, 'users', 'MIgCbQY8IQhKSz8T8h9Mr7plBvt1', 'notes', id);
    const washingtonRef = doc(notesCollectionRef, id);

    await updateDoc(washingtonRef, {
      content: content,
    });

    // const index = notes.value.findIndex((note) => {
    //   return note.id === id;
    // });
    // notes.value[index].content = content;
  };

  // const getNoteContent = computed(() => {
  //   return notes.value[0].content;
  // });

  const totalNotesCount = computed(() => {
    return notes.value.length;
  });

  const totalCharactersCout = computed(() => {
    let count = 0;
    notes.value.forEach((note) => {
      count += note.content.length;
    });
    return count;
  });

  return {
    notes,
    addNote,
    deleteNote,
    clearNotes,
    getNoteContent,
    updateContent,
    totalNotesCount,
    totalCharactersCout,
    getNotes,
    initNotes,
    nowLoaded,
  };
});
