import { View, Image } from "react-native";
import icon from "../../../constants/icon";
import {styles} from "./Telainicial.style.js"

function Telainicial() {
    return (
        <View style={styles.container}>
        <View style={styles.containerLogo}>
        <Image source={icon.logoinicial} style={styles.logo} />
        </View>
        </View>

    )

}

export default Telainicial;