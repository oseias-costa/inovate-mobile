import { Ionicons } from "@expo/vector-icons"

type StatusDoc = {
    statusDoc: "FINISH" | "EXPIRED" | "PEDING"
}

export default function StatusIcon({statusDoc}: StatusDoc){
    if(statusDoc === 'FINISH'){
        <Ionicons name="checkmark-circle" size={24} color="#00264B" />
    }
}