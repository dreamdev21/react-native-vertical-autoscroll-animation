import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { ItemType, Item, generate } from "./Support";
import ContinuousFlatList from "./components/ContinuousFlatList";

const data = [
  generate(),
  generate(),
  generate(),
  generate(),
  generate(),
  generate(),
  generate(),
  generate(),
];

export default () => {
  const [items, setItems] = useState<Array<ItemType>>([]);

  useEffect(() => {
    setItems(data);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, flexDirection: "row" }}>
      <ContinuousFlatList
        data={data}
        renderItem={Item}
        keyExtractor={(item: ItemType, i: number) => `${i}`}
        onEndReached={() => {
          console.log("end reached");
          setItems([...items, generate(), generate()]);
        }}
      />
      <ContinuousFlatList
        inverted={true}
        data={data}
        renderItem={Item}
        keyExtractor={(item: ItemType, i: number) => `${i}`}
      />
    </SafeAreaView>
  );
};
