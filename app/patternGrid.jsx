import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";

// Get screen dimensions for responsiveness
const { width, height } = Dimensions.get("window");

// Function to generate random width and height for the grid items
const getRandomSize = () => {
  const randomWidth = Math.floor(Math.random() * (width / 2 - 50)) + 100; // Width between 100 and width/2
  const randomHeight = Math.floor(Math.random() * (height / 3 - 50)) + 150; // Height between 150 and height/3
  return { width: randomWidth, height: randomHeight };
};

// Example data for the grid with custom local images
const DATA = [
  {
    id: "1",
    title: "Nature",
    image: require("../assets/images/nature.jpeg"), // Custom local image
  },
  {
    id: "2",
    title: "Travel",
    image: require("../assets/images/travel.jpeg"), // Custom local image
  },
  {
    id: "3",
    title: "Food",
    image: require("../assets/images/food.jpeg"), // Custom local image
  },
  {
    id: "4",
    title: "Art",
    image: require("../assets/images/art.jpeg"), // Custom local image
  },
  {
    id: "5",
    title: "Tech",
    image: require("../assets/images/tech.jpeg"), // Custom local image
  },
];

// Grid item component
const GridItem = ({ title, image }: any) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleImageLoad = () => {
    setLoading(false);
  };

  const { width: itemWidth, height: itemHeight } = getRandomSize(); // Get random width and height for this item

  return (
    <TouchableOpacity
      style={[styles.card, { width: itemWidth, height: itemHeight }]}
      onPress={() => router.push("/feedGrid")}
    >
      <Image source={image} style={styles.image} onLoad={handleImageLoad} />
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

export default function PatternGrid() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulating data loading (this is just for demo)
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
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Back Arrow Icon */}
        <TouchableOpacity onPress={() => router.back()} testID="backArrow">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headerTitle} testID="headerTitle">
          My Custom Header
        </Text>
      </View>
      <View style={styles.gridContainer}>
        {/* Map over the data array and render the items */}
        {DATA.map((item) => (
          <GridItem
            key={item.id}
            title={item.title}
            image={item.image}
            testID={"scroll"}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    height: "8%",
    backgroundColor: "#f0f0f0",
  },
  headerTitle: {
    marginLeft: 30,
    fontSize: 20,
    fontWeight: "bold",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // This allows items to wrap to the next line
    justifyContent: "space-evenly", // Space out items evenly within the container
    paddingHorizontal: 10,
    paddingBottom: 35,
  },
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4, // Shadow effect for card
    position: "relative",
    width: "45%", // Ensure cards are responsive
    marginBottom: 5,
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
