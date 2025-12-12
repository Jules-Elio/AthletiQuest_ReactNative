import React, {useState} from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {X} from 'lucide-react-native';
import {Formik} from "formik";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import {User} from "@/app/(tabs)/profile";
import {useSession} from "@/auth/context";

interface EventSaveRequest {
    name: string;
    description: string;
    address: string;
    startDate: Date;
    createdAt: Date;
    owner: User;
    participants: User[];
}

interface EventModalProps {
    visible: boolean;
    onClose: () => void;
    user: User;
}

export function EventModal({visible, onClose, user}: Readonly<EventModalProps>) {

    const [showDatePicker, setShowDatePicker] = useState(false);
    const {sessionToken} = useSession();


    return (<Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
    >
        <View style={styles.overlay}>
            <TouchableWithoutFeedback>
                <ScrollView contentContainerStyle={styles.modalContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Nouvel évènement</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color="#6B7280"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.filtersContainer}>
                        <Formik initialValues={{
                            name: "", description: "", address: "", startDate: new Date(),
                        }} onSubmit={async values => {

                            let eventRequest: EventSaveRequest = {
                                name: values.name,
                                description: values.description,
                                address: values.address,
                                startDate: values.startDate,
                                createdAt: new Date(),
                                owner: user,
                                participants: []
                            }

                            try {
                                const response = await fetch("http://192.168.0.204:8080/events/save", {
                                    method: "POST",
                                    headers: {'Authorization': `Bearer ${sessionToken}`, "Content-Type": "application/json"},
                                    body: JSON.stringify(eventRequest)
                                });
                                if (response.ok) {
                                    const event = await response.json();
                                    const signupResponse = await fetch(`http://192.168.0.204:8080/events/${event.id}/signup`, {
                                        method: "POST",
                                        headers: {'Authorization': `Bearer ${sessionToken}`, "Content-Type": "application/json"},
                                    });
                                    if (signupResponse.ok) {
                                    }
                                }
                            } catch (error) {
                                console.error(error);
                            }

                            onClose();
                        }}>{({
                                 handleChange, handleBlur, handleSubmit, values, setFieldValue,
                             }) => (<>
                            <View>
                                <Text>Nom de l'évènement</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                            </View>
                            <View>
                                <Text>Description</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={values.description}
                                    maxLength={255}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                />
                            </View>
                            <View>
                                <Text>Adresse</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={values.address}
                                    onChangeText={handleChange('address')}
                                    onBlur={handleBlur('address')}
                                />
                            </View>
                            <View>
                                <Text>Date</Text>
                                <TouchableOpacity
                                    style={styles.inputStyle}
                                    onPress={() => setShowDatePicker(true)}
                                >
                                    <Text>
                                        {values.startDate ? values.startDate.toLocaleDateString() : "Sélectionner une date"}
                                    </Text>
                                </TouchableOpacity>

                                {showDatePicker && (<RNDateTimePicker
                                        value={values.startDate}
                                        minimumDate={new Date()}
                                        display="default"
                                        onChange={(event, selectedDate) => {
                                            setShowDatePicker(false);
                                            if (selectedDate) {
                                                setFieldValue("startDate", selectedDate);
                                            }
                                        }}
                                    />)}
                            </View>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Créer l'évènement</Text>
                            </TouchableOpacity>
                        </>)}
                        </Formik>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </View>
    </Modal>);
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }, modalContent: {
        backgroundColor: '#FFFFFF', borderRadius: 16, padding: 24, width: '80%', margin: "auto"
    }, modalHeader: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20,
    }, modalTitle: {
        fontSize: 20, fontWeight: '600', color: '#333',
    }, closeButton: {
        padding: 4,
    }, filtersContainer: {
        gap: 12,
    }, filterOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#E0E0E0',
    }, activeFilterOption: {
        backgroundColor: '#ff6600',
    }, filterIcon: {
        marginRight: 12,
    }, filterLabel: {
        fontSize: 16, color: '#333',
    }, activeFilterLabel: {
        color: '#FFFFFF',
    }, button: {
        width: '100%',
        height: 50,
        backgroundColor: '#ff6600',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    }, buttonText: {
        color: '#000', fontSize: 18,
    }, inputStyle: {
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: "#F9FAFB",
        marginTop: 4,
    }
});
