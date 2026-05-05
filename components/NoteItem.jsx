import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NoteItem = ({ note, onDelete }) => {
  //console.log("Data in NoteItem:" + JSON.stringify(note));

  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>

      <TouchableOpacity onPress={() => onDelete(note.$id)}>
        <Text style={styles.delete}>❌</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#D3D3D3",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 18,
  },
  delete: {
    fontSize: 18,
    color: "red",
  },
});

export default NoteItem;
