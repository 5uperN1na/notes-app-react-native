import { StyleSheet, Text, View } from "react-native";

const NoteItem = ({ note }) => {
  console.log("Data in NoteItem:" + JSON.stringify(note));

  return (
    <View style={styles.noteItem}>
      <Text style={styles.noteText}>{note.text}</Text>
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
});

export default NoteItem;
