import { useRouter } from "expo-router";
import React, { memo } from "react";
import { Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { dummyData } from "../dummyData";

const { width } = Dimensions.get("window");
const SMALL_BLOCK_SIZE = width / 3;
const BIG_BLOCK_HEIGHT = SMALL_BLOCK_SIZE * 2;

const chunkData = (arr, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
};

// Use FastImage if needed (alternative to <Image />) for stronger caching:
// import FastImage from 'react-native-fast-image';

const GridImage = memo(({ uri, style }) => (
  <Image
    source={{ uri, cache: "force-cache" }} // Enables caching
    style={[style, styles.image]}
  />
));

const FeedGrid = () => {
  const groupedData = chunkData(dummyData, 6);
  console.log(groupedData, "fv");

  const router = useRouter();

  const renderPattern = ({ item: group, index }) => {
    const isEven = index % 2 === 0;

    const getImage = (i) => group[i]?.url || "https://via.placeholder.com/150";

    return (
      <View style={styles.rowWrapper} testID={`list-item-${index}`}>
        {isEven ? (
          <>
            <TouchableOpacity style={styles.column} onPress = {() => router.push("/trial")}>
              <GridImage uri={getImage(0)} style={styles.smallBlock} />
              <GridImage uri={getImage(1)} style={styles.smallBlock} />
            </TouchableOpacity>
            <View style={styles.column}>
              <GridImage uri={getImage(2)} style={styles.smallBlock} />
              <GridImage uri={getImage(3)} style={styles.smallBlock} />
            </View>
            <GridImage uri={getImage(4)} style={styles.bigBlock} />
          </>
        ) : (
          <>
            <GridImage uri={getImage(0)} style={styles.bigBlock} />
            <View style={styles.column}>
              <GridImage uri={getImage(1)} style={styles.smallBlock} />
              <GridImage uri={getImage(2)} style={styles.smallBlock} />
            </View>
            <View style={styles.column}>
              <GridImage uri={getImage(3)} style={styles.smallBlock} />
              <GridImage uri={getImage(4)} style={styles.smallBlock} />
            </View>
          </>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={groupedData}
        keyExtractor={(_, index) => `group-${index}`}
        renderItem={renderPattern}
        showsVerticalScrollIndicator={false}
        // removeClippedSubviews={false} // keeps off-screen items mounted
        // initialNumToRender={4}
        // maxToRenderPerBatch={6}
        windowSize={10}
        testID="scroll-feed"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: "row",
    marginBottom: 0,
    backgroundColor: "#fff",
  },
  column: {
    flexDirection: "column",
  },
  smallBlock: {
    width: SMALL_BLOCK_SIZE,
    height: SMALL_BLOCK_SIZE,
  },
  bigBlock: {
    width: SMALL_BLOCK_SIZE,
    height: BIG_BLOCK_HEIGHT,
  },
  image: {
    resizeMode: "cover",
    borderWidth: 0.5,
    borderColor: "#eee",
    borderRadius: 6,
    overflow: "hidden",
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
});

export default FeedGrid;
