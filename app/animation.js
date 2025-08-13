import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

const generateRandomHeight = () => {
  return Math.floor(Math.random() * 100) + 80;
};

const Animation = () => {
  const ballY = useSharedValue(0);
  const bgColor = useSharedValue(0);
  const isBouncing = useSharedValue(false);
  const [isTouching, setIsTouching] = useState(false);
  const ballRotation = useSharedValue(0);
  const ballRotate = useSharedValue(0);
  const barrierX = useSharedValue(Dimensions.get("window").width); // X position of the barrier
  const barrierHeight = useSharedValue(generateRandomHeight()); // Barrier height

  const isJumping = useSharedValue(false);

  const router = useRouter();

  useAnimatedReaction(
    () => barrierX.value,
    (x) => {
      if (x <= 100 && !isJumping.value) {
        isJumping.value = true;

        ballY.value = withSequence(
          withTiming(-height / 3, {
            duration: 400,
            easing: Easing.out(Easing.quad),
          }),
          withTiming(0, {
            duration: 500,
            easing: Easing.bounce,
          })
        );

        runOnJS(() => {
          console.log("[🚀 Ball Jump Triggered]");
          setTimeout(() => {
            isJumping.value = false;
            console.log("[🔁 isJumping reset to false]");
          }, 1000);
        })();
      }
    }
  );

  const bounceBall = () => {
    if (isBouncing.value) return;
    isBouncing.value = true;

    ballY.value = withTiming(
      -height / 3,
      {
        duration: 400,
        easing: Easing.out(Easing.quad),
      },
      () => {
        ballY.value = withTiming(
          0,
          {
            duration: 500,
            easing: Easing.bounce,
          },
          () => {
            isBouncing.value = false;
          }
        );
      }
    );
  };

  const animatedRotationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: ballY.value },
        { rotate: `${ballRotation.value}deg` },
      ],
    };
  });

  const animatedBgStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      bgColor.value,
      [0, 1],
      ["#1a1a1a", "#333"]
    );
    return { backgroundColor };
  });
  const animatedBarrierStyle = useAnimatedStyle(() => {
    return {
      left: barrierX.value,
      height: barrierHeight.value,
    };
  });

  const animateBarrier = async () => {
    console.log("Animation started");

    // Animate the barrier position from right to left
    await new Promise((resolve) => {
      barrierX.value = withRepeat(
        withTiming(-50, { duration: 3000, easing: Easing.linear }), // Move from right to left
        -1, // Infinite repeat
        false // Don't reverse the animation
      );
      resolve();
    });
  };

  // Update barrier height with random value after animation
  const updateHeight = async () => {
    console.log("Updating height");
    runOnJS(() => {
      barrierHeight.value = generateRandomHeight();
    })();
  };

  // Function to check if the ball touches the barrier
  const checkCollision = async () => {
    console.log("Checking collision");
    console.log(barrierX.value, "Current position", isTouching);
    if (barrierX.value >= 0 && !isTouching) {
      console.log("Ball touched the barrier");
      setIsTouching(true); // Set state to indicate touch
      Alert.alert("Game Over");
    } else {
      console.log("No collision detected");
    }
  };

  // UseEffect to handle animation and collision detection
  useEffect(() => {
    const startAnimations = async () => {
      await animateBarrier(); // Start the barrier animation
      await updateHeight(); // Update the height periodically
    };

    startAnimations(); // Start all animations when component is mounted

    // Collision check (every frame or after every animation step)
    const intervalId = setInterval(async () => {
      await checkCollision();
    }, 100); // Check collision every 100ms

    // Update the barrier height every 3000ms
    const heightUpdateInterval = setInterval(async () => {
      await updateHeight();
    }, 3000);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId); // Clean up collision check interval
      clearInterval(heightUpdateInterval); // Clean up height update interval
    };
  }, [isTouching]);

  useEffect(() => {
    console.log("[🔄 useEffect Called]");

    ballY.value = withRepeat(
      withSequence(
        withTiming(-height / 3, {
          duration: 500,
          easing: Easing.out(Easing.quad),
        }),
        withTiming(0, {
          duration: 500,
          easing: Easing.bounce,
        })
      ),
      -1,
      true
    );

    ballRotate.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );

    const loopBg = () => {
      console.log("repeat again");
      bgColor.value = withTiming(
        bgColor.value === 0 ? 1 : 0,
        {
          duration: 1000,
        },
        loopBg
      );
    };
    loopBg();
  }, []);

  return (
    <Pressable style={{ flex: 1 }} onPress={bounceBall}>
      <Animated.View style={[styles.container, animatedBgStyle]}>
        <View style={styles.floor} />
        <Animated.View style={[styles.ball, animatedRotationStyle]} />
        <Animated.View style={[styles.barrier, animatedBarrierStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Animation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", // anchor ball to bottom
  },
  mainContainer: {
    flex: 1,
    justifyContent: "flex-end", // anchor ball to bottom
  },
  ball: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FF4081",
    marginLeft: 5,
    marginBottom: 80, // distance from floor
  },
  floor: {
    width: "100%",
    height: 4,
    backgroundColor: "#fff",
    position: "absolute",
    marginBottom: 70,
    bottom: 0,
  },
  barrier: {
    position: "absolute", // Position the barrier absolutely on the screen
    width: 50, // Static width
    backgroundColor: "red", // Static color
  },
});
