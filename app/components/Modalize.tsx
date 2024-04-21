import Button from "@ant-design/react-native/lib/button";
import Modal from "@ant-design/react-native/lib/modal";
import { useState } from "react";
import { Text, View } from "react-native";

export default function Modalize(){
    const [modal, setModal] = useState(false)

    return (
      <Modal
        popup
        closable
        maskClosable
        animated
        visible={modal}
        animationType="slide-up"
        onClose={() => setModal(false)}
        title="Selecione"
    >
        <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
          <Text style={{ textAlign: 'center' }}>Content...</Text>
          <Text style={{ textAlign: 'center' }}>Content...</Text>
        </View>
        <Button type="primary" onPress={() => setModal(false)}>
          close modal
        </Button>
      </Modal>
    );
}