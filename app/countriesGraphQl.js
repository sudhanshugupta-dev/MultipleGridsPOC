import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache(),
});

const countriesGraphQl = () => {
  return (
    <ApolloProvider client={client}>
      <CountriesScreen />
    </ApolloProvider>
  );
};

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
      continent {
        name
      }
      currency
    }
  }
`;

const CountriesScreen = () => {
  const { data, loading, error, refetch } = useQuery(GET_COUNTRIES);
  const [searchText, setSearchText] = useState("");

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (error) return <Text>Error: {error.message}</Text>;

  const filteredCountries = data.countries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchText.toLowerCase()) ||
      country.code.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name or code"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.code}
        refreshing={loading}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.flag}>{item.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>
                Code: {item.code} | Continent: {item.continent.name} | Currency:{" "}
                {item.currency}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
  card: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  flag: { fontSize: 28, marginRight: 12 },
  info: { flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  details: { fontSize: 14, color: "#666" },
});

export default countriesGraphQl;
