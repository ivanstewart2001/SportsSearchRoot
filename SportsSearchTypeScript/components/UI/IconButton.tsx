import { Pressable, StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { IconButtonProps } from '../../types/UI/IconButton'

function IconButton({ icon, size , color, onPressProp, title, titleStyles, componentStyles, containerStyles }:IconButtonProps) {
    return (
        <Pressable 
            onPress={onPressProp} 
            style={({ pressed }) => pressed ? [styles.pressed, componentStyles] : componentStyles}
        >
            <View style={ containerStyles ? [styles.contentContainer, containerStyles] : styles.contentContainer }>
                <View style={styles.buttonContainer}>
                    <Ionicons name={icon} size={size} color={color} />
                </View>
                {title && <Text style={titleStyles}>{title}</Text>}
            </View>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        borderRadius: 24,
        padding: 6,
        marginHorizontal: 8,
        marginVertical: 2
    },
    pressed: {
        opacity: 0.75
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default IconButton