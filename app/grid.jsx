import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const ITEM_SIZE = width / 3 - 20; // 3-column grid (responsive)

// Custom local images added in the assets/images folder
const DATA = [
  {
    id: "1",
    title: "Nature",
    image: require("../assets/images/nature.jpeg"), // Local image path
  },
  {
    id: "2",
    title: "Travel",
    image: require("../assets/images/travel.jpeg"), // Local image path
  },
  {
    id: "3",
    title: "Food",
    image: require("../assets/images/food.jpeg"), // Local image path
  },
  {
    id: "4",
    title: "Art",
    image: require("../assets/images/art.jpeg"), // Local image path
  },
  {
    id: "5",
    title: "Tech",
    image: require("../assets/images/tech.jpeg"), // Local image path
  },
];

const GridItem = ({ title, image }: any) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push("/patternGrid")}
    >
      <Image
        source={image} // Using local image here
        style={styles.image}
        onLoad={handleImageLoad} // Trigger loading event when image is loaded
      />
      {loading && (
        <LottieView
          source={require("../assets/images/loading.json")}
          autoPlay
          loop
          style={styles.loader}
        />
      )}
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function Grid() {
  const [loading, setLoading] = useState(true);
  const [numColumns, setNumColumns] = useState(3); // Default is 3 columns

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <LottieView
        source={require("../assets/images/loading.json")}
        autoPlay
        loop
        style={styles.loader}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        numColumns={numColumns} // Dynamically set the number of columns
        key={`grid-${numColumns}`} // Use the `key` prop to trigger re-render on `numColumns` change
        renderItem={({ item }) => (
          <GridItem title={item.title} image={item.image} />
        )}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: "center", // Centers content vertically
    alignItems: "center", // Centers content horizontally
  },
  grid: {
    width: "100%", // Make the grid width responsive
    justifyContent: "center", // Align items inside the grid
    alignItems: "center", // Align items inside the grid
  },
  card: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4, // Shadow effect for card
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -25,
    marginTop: -25,
    width: 50,
    height: 50,
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    padding: 8,
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
