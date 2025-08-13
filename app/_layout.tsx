import { useColorScheme } from "@/hooks/useColorScheme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const client = new ApolloClient({
    uri: "http://192.168.0.206:4000/",
    cache: new InMemoryCache(),
  });

  return (
    <>
      <ApolloProvider client={client}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="Ponggame" options={{ headerShown: false }} /> */}
          <Stack.Screen name="grid" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ApolloProvider>
    </>
  );
}
