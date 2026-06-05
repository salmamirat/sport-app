import SportCard from "@/components/SportCard";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface Sport {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function HomeScreen() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [filteredSports, setFilteredSports] = useState<Sport[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://6a2009b2e96c1d13b586e7a9.mockapi.io/sports", {
        timeout: 10000,
      })
      .then((response) => {
        setSports(response.data);
        setFilteredSports(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err.message);
        setError("m9drtch ntconnecta");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = sports.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredSports(filtered);
  }, [search, sports]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "red" }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>

      {}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Search sport..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {}
      <FlatList
        data={filteredSports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SportCard
            id={item.id}
            title={item.name}
            description={item.description}
            imageUrl={`${item.image}?q=80&w=600`}
            onPress={() => router.push(`/details/${item.id}`)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cbd5c5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    padding: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    height: 45,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
  },
});