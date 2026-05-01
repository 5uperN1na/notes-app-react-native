import { FlatList, StyleSheet, View } from "react-native";
import NoteItem from "../components/NoteItem";

const NoteList = ({ notes }) => {
  console.log("Data in NoteList: " + JSON.stringify(notes));

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) =>
          item.$id?.toString() ?? item.id?.toString() ?? index.toString()
        }
        renderItem={({ item }) => <NoteItem note={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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

export default NoteList;
