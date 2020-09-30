import React from "react";
import { Image, View, Text } from "react-native";
import styles from "./styles";

export const generate = () => ({
  title: `${new Date().getTime()}`,
  subtitle: "Test Subtitle",
  image: "https://picsum.photos/200",
});

export type ItemType = {
  title: string;
  subtitle: string;
  image: string;
};

export const Item = ({ item }: { item: ItemType }) => (
  <View style={styles.item}>
    <Image source={{ uri: item.image }} style={{ width: 100, height: 100 }} />
    <Text>{item.title}</Text>
    <Text>{item.subtitle}</Text>
  </View>
);

export const Sample = () => (
  <Item
    item={{
      title: "Test 1",
      subtitle: "Test 1 Subtitle",
      image: "https://picsum.photos/200",
    }}
  />
);
