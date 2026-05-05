import { ID } from 'react-native-appwrite';
import databaseService from './databaseService';

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

const noteService = {
  // Get Notes
  async getNotes() {
    const response = await databaseService.listDocuments(dbId, colId);
    if (response.error) {
      return { error: response.error }
    }

    return { data: response.data };

  },

  //Add new note
  async addNote(text) {

    if (!text) {
      return { error: "Note text can't be empty." }
    }
    const data = {
      text: text,
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
    }

    // console.log('db id ' + dbId);
    // console.log('col id ' + colId);
    // console.log('data ' + JSON.stringify(data))
    // console.log('ID unique ' + ID.unique());

    const response = await databaseService.createDocument(dbId, colId, ID.unique(), data);

    if (response?.error) {
      return { error: response.error }
    }
    return { data: response};
  },

  //Delete Note

    async deleteNote(id) {
    const response = await databaseService.deleteDocument(dbId, colId, id);
    if (response?.error) {
      return { error: response.error };
    }

    return { success: true };
  },
  
};

export default noteService;