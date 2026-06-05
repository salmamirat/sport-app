import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withSequence, withTiming, } from "react-native-reanimated";
import { useSportStore } from "../store/useSportStore";

interface HeartButtonProps {
  id: string;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function HeartButton({ id }: HeartButtonProps) {
  const isFavorite = useSportStore((state) => state.isFavorite(id));
  const toggleFavorite = useSportStore((state) => state.toggleFavorite);

  const scale = useSharedValue(1);

  
  useEffect(() => {
    if (isFavorite) {
      scale.value = withSequence(
        withTiming(1.3, { duration: 150 }),
        withSpring(1, { damping: 10, stiffness: 300 })
      );
    }
  }, [isFavorite]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
   
    scale.value = withSequence(
      withTiming(0.8, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    toggleFavorite(id);
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      style={[styles.button, animatedStyle]}
      hitSlop={10}
    >
      {}
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "#ff3b30" : "#a0a0a0"}
      />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({  
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
});