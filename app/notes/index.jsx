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
    //console.log("use effect");
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    // console.log("fetching notes");
    setLoading(true);
    const response = await noteService.getNotes();
    //console.log("Data from Notes Index:" + JSON.stringify(response.data));

    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
      setNotes([]);
    } else {
      setNotes(response.data || []);
      setError(null);
    }

    setLoading(false);
  };

  // useEffect(() => {
  //   console.log("State has been updated to: ", JSON.stringify(notes));
  // }, [notes]);

  //add new note
  const addNote = async () => {
    //console.log("adding new notes.");
    if (newNote.trim() === "") {
      return;
    }

    // setNotes((prevNotes) => [
    //   ...prevNotes,
    //   { id: Date.now.toString(), text: newNote },
    // ]);

    const response = await noteService.addNote(newNote);

    if (response.error) {
      //Alert.alert("Error", response.error);
      console.log("Error adding new note");
    } else {
      // console.log("notes: " + JSON.stringify(notes));
      // console.log("response data: " + JSON.stringify(response.data));
      await fetchNotes();
      //setNotes([...notes, response.date]);
    }

    setNewNote("");
    setModalVisible(false);
  };

  // Delete Note
  const deleteNote = async (id) => {
    Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const response = await noteService.deleteNote(id);
          if (response.error) {
            Alert.alert("Error", response.error);
          } else {
            setNotes(notes.filter((note) => note.$id !== id));
          }
        },
      },
    ]);
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
