import { config } from './appwrite';
import databaseService from './databaseService';

const noteService = {
  async getNotes() {
    const response = await databaseService.listDocuments(
      config.db,
      config.col.notes
    );

    if (response.error) {
      return { error: response.error };
    }

    return { data: response.data };
  },
};

export default noteService;