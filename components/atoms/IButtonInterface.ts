import { GestureResponderEvent } from "react-native";

interface IButtonInterface {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
}

export {IButtonInterface};