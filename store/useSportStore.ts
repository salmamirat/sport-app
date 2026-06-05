import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface SportStore {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}
// bach t5zn sport fi favorites   bach yb9aw mn ba3d ki n7lo app  
export const useSportStore = create<SportStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) =>
        set((state) => {
          if (state.favorites.includes(id)) {
            return { favorites: state.favorites.filter((fav) => fav !== id) };
          }
          return { favorites: [...state.favorites, id] };
        }),
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: "sport-favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);