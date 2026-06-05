import { useRoute } from "@react-navigation/native";
import { Dimensions, FlatList, Image, View } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Gallery() {
    const route = useRoute();
    const { sport } = (route.params as { sport?: any }) || {};
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={sport?.gallery}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Image source={{ uri: item.image }}
                        style={{
                            width,
                            height,
                        }}
                        resizeMode="cover"
                    />
                )}
            />
        </View>
    );
}