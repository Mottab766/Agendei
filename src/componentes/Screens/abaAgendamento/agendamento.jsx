import { View, Text, FlatList } from "react-native";
import{styles} from "./agendamento.styles.js"
import {appointments} from "../../../constants/data.js"
import Appointment from "../../appointment/appointment.jsx";

function Agendamento(){
    return (
        <View style = {styles.container}>

            <FlatList data={appointments} 
                    keyExtractor={(appoint) => appoint.id_appoint}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                        return <Appointment sercice={item.service}
                                            doctor={item.doctor}
                                            specialty={item.specialty}/>
                    }}/>
        </View>
    )

}


export default Agendamento;