import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width, height } = Dimensions.get("window");

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

export default function Gallery() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [sport, setSport] = useState<SportData | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <View style={styles.errorContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  if (!sport) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Galerie introuvable</Text>
        <TouchableOpacity
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/")
          }
          style={{ marginTop: 20 }}
        >
          <Text style={{ color: "#00cc00", fontSize: 16 }}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace("/");
          }
        }}
      >
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      {}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {currentIndex + 1} / {sport.gallery.length}
        </Text>
      </View>

      {}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
            listener: (event: any) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width,
              );
              setCurrentIndex(index);
            },
          },
        )}
      >
        {sport.gallery.map((item: any, index: number) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={item.id}
              style={[
                styles.imageContainer,
                { transform: [{ scale }], opacity },
              ]}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.image}
                resizeMode="cover"
              />
            </Animated.View>
          );
        })}
      </ScrollView>

      {}
      <View style={styles.dotsContainer}>
        {sport.gallery.map((_: any, index: number) => {
          const dotWidth = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [8, 24, 8],
            extrapolate: "clamp",
          });

          const dotOpacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity: dotOpacity,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backText: {
    color: "white",
    fontSize: 18,
  },
  counterContainer: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  counterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  imageContainer: {
    width,
    height,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width,
    height,
  },
  dotsContainer: {
    position: "absolute",
    bottom: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  errorContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "white",
    fontSize: 18,
  },
});
