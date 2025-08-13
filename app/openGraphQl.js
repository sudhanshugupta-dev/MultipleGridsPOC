import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
  useQuery,
} from "@apollo/client";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

// ✅ Apollo client setup
const client2 = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
  cache: new InMemoryCache(),
});

// ✅ GraphQL Query
export const GET_DETAILS = gql`
  fragment CompanyDetail on Info {
    ceo
    coo
    cto
    founder
    founded
    headquarters {
      address
      city
      state
    }
    launch_sites
  }

  query ExampleQuery {
    roadster {
      apoapsis_au
    }
    company {
      ...CompanyDetail
    }
  }
`;

// ✅ Component with proper query handling
const OpenGraph = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_DETAILS);
  //console.log("is it Correct", data);
  if (loading) {
    return (
      <ActivityIndicator size="large" color="blue" style={styles.centered} />
    );
  }

  if (error) {
    console.error("GraphQL Error:", error);
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CEO: {data?.company?.ceo ?? "N/A"}</Text>
      <Text style={styles.label}>
        Roadster Apoapsis AU: {data?.roadster?.apoapsis_au ?? "N/A"}
      </Text>
      <Button title="Next =>" onPress={() => router.push("/animation")} />
    </View>
  );
};

// ✅ ApolloProvider wrapping the component
export default function openGraphQl() {
  return (
    <ApolloProvider client={client2}>
      <OpenGraph />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
  },
  error: {
    color: "red",
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
});
