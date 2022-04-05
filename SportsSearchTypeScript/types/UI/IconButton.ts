import { Ionicons } from '@expo/vector-icons';
import { TextStyle, ViewStyle } from 'react-native';

export interface IconButtonProps {
    icon:keyof typeof Ionicons.glyphMap, 
    size:number , 
    color?:string, 
    onPressProp():any,
    title: string,
    titleStyles: TextStyle,
    componentStyles: ViewStyle,
    containerStyles: ViewStyle
}