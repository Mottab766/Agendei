import { Text, View } from "react-native";
import {styles} from "./perfil.style.js"

function Perfil () {
 return (
    <View style={styles.container}>
        <View style={styles.item}>
            <Text style={styles.titulo}>Nome</Text>
            <Text style={styles.text}>Bruno Motta</Text>
        </View>
        <View style={styles.item}>
            <Text style={styles.titulo}>Email</Text>
            <Text style={styles.text}>teste@teste.com</Text>
        </View>
    </View>
 )

}

export default Perfil;