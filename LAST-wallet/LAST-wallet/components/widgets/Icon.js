import React from 'react'
import { Platform } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Octicon from 'react-native-vector-icons/Octicons'
import Zocial from 'react-native-vector-icons/Zocial'
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons'
import { colors, measures } from '../../common/styles'

function getSize(size) {
    if ((size >>> 0) > 0) return size;
    switch (size) {
        case 'small': return measures.iconSizeSmall;
        case 'large': return measures.iconSizeLarge;
        default:
        case 'medium': return measures.iconSizeMedium;
    }
}

function getIonicon({ name, size, ...props }) {
    name = (Platform.OS === 'ios') ? `ios-${name}` : `md-${name}`;
    return <Ionicon {...props} name={name} size={size} />;
}

export const Icon = (props) => {
    if (!props.name) return null;
    const size = getSize(props.size);
    const color = props.color || colors.black;
    switch (props.type) {
        case 'ent': return <Entypo {...props} size={size} color={color} />
        case 'ei': return <EvilIcon {...props} size={size} color={color} />
        case 'fe': return <Feather {...props} size={size} color={color} />
        case 'fa': return <FontAwesome {...props} size={size} color={color} />
        case 'fo': return <Foundation {...props} size={size} color={color} />
        case 'md': return <MaterialIcon {...props} size={size} color={color} />
        case 'mdc': return <MaterialCommunityIcon {...props} size={size} color={color} />
        case 'oct': return <Octicon {...props} size={size} color={color} />
        case 'zo': return <Zocial {...props} size={size} color={color} />
        case 'simple': return <SimpleLineIcon {...props} size={size} color={color} />

        default:
        case 'ionicons': return getIonicon({ ...props, color, size })
    }
}