import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Image } from "expo-image";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import HeartButton from "../components/HearButton";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface SportCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  onPress?: () => void;
}

export default function SportCard({ id, title, description, imageUrl, onPress }: SportCardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.96);
    opacity.value = withTiming(0.9, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1, { duration: 150 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.cardContainer, animatedStyle]}
    >
      <Image
        source={imageUrl}
        style={styles.cardImage}
        contentFit="cover"
        transition={300}
      />

      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {description}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <HeartButton id={id} />
        <View style={styles.iconContainer}>
          <Ionicons name="chevron-forward" size={20} color="#cbd5c5" />
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({

  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#293507ff",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: "#f0f0f0",
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4f6345ff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});