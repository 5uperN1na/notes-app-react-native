import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AddNoteModal from "../../components/AddNoteModal";
import NoteList from "../../components/NoteList";
import noteService from "../../services/noteService";

const NoteScreen = () => {
  const [notes, setNotes] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newNote, setNewNote] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await noteService.getNotes();
    console.log("Data from Notes Index:" + JSON.stringify(response.data));

    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      setNotes(response.data);
      setError(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("State has been updated to: ", notes);
  }, [notes]);

  //add new note
  const addNote = () => {
    if (newNote.trim() === "") {
      return;
    }

    setNotes((prevNotes) => [
      ...prevNotes,
      { id: Date.now.toString(), text: newNote },
    ]);

    setNewNote("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <NoteList notes={notes} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  addButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NoteScreen;
