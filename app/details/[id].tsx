import HeartButton from "../../components/HearButton";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface GalleryItem {
  id: string;
  image: string;
  quote: string;
}

interface SportData {
  id: string;
  name: string;
  image: string;
  description: string;
  gallery: GalleryItem[];
}

export default function DetailsScreen() {
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [sport, setSport] = useState<SportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://6a2009b2e96c1d13b586e7a9.mockapi.io/sports/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSport(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.errorContainer} edges={["top", "bottom"]}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (!sport) {
    return (
      <SafeAreaView style={styles.errorContainer} edges={["top", "bottom"]}>
        <Text style={[styles.errorText, { fontSize: width > 600 ? 24 : 18 }]}>
          Sport introuvable
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: sport.image }} style={styles.headerImage} />

      <SafeAreaView edges={["top"]} style={styles.topButtonsContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.heartButtonWrapper}>
          <HeartButton id={id as string} />
        </View>
      </SafeAreaView>

      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{sport.name}</Text>

          <View style={styles.descriptionContainer}>
            <Text style={styles.bulletPoint}>• {sport.description}</Text>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.galleryButton}
            onPress={() => router.push(`/gallery/${id}`)}
          >
            <Text style={styles.galleryButtonText}>Ouvrir la galerie</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 350,
    resizeMode: "cover",
    position: "absolute",
    top: 0,
  },
  topButtonsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heartButtonWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  contentContainer: {
    flex: 1,
    marginTop: 300,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
    marginBottom: 4,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 34,
    backgroundColor: "#f5f5f5",
  },
  galleryButton: {
    backgroundColor: "#00cc00",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  galleryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#cbd5c5",
  },
  errorText: {
    fontWeight: "600",
    textAlign: "center",
    color: "#666",
  },
});
