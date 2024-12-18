import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Analyses from "./Analyses";
import Home from "./Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Analyses" component={Analyses} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
