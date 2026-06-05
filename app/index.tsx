import SportCard from "@/components/SportCard";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; 

interface Sport {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function HomeScreen() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://6a2009b2e96c1d13b586e7a9.mockapi.io/sports", {
        timeout: 10000,
      })
      .then((response) => {
        setSports(response.data);
        setLoading(false);
      })

      .catch((err) => {
        console.error("API 9_error :", err.message);
        setError("m9drtch ntconnecta ");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#1a1a1a" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text style={{ color: "red", textAlign: "center", padding: 20 }}>
          {error}
        </Text>
      </SafeAreaView>
    );
  }

  if (!sports || sports.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <Text>No sports available.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <FlatList
        data={sports}
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
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 20,
  },
});