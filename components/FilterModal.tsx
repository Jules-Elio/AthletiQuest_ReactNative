import React from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {X} from 'lucide-react-native';
import {getStadiumRequest, setStadiumRequest} from "@/app/(tabs)";
import {Formik} from "formik";

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onFilterChanged: () => void;
}

export function FilterModal({visible, onClose, onFilterChanged}: Readonly<FilterModalProps>) {

    let request = getStadiumRequest();

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
                        <Text style={styles.modalTitle}>Filtres</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color="#6B7280"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.filtersContainer}>
                        <Formik initialValues={{
                            name: request.name,
                            description: request.description,
                            city: request.city,
                            postalCode: request.postalCode,
                            freeAccess: request.freeAccess,
                            latitude: request.latitude,
                            longitude: request.longitude,
                            searchRadius: request.searchRadius,
                            resultsLimit: request.resultsLimit,
                        }} onSubmit={values => {
                            setStadiumRequest(values);
                            onFilterChanged();
                            onClose();
                        }}>{({
                                 handleChange, handleBlur, handleSubmit, values, setFieldValue,
                             }) => (<>
                            <View>
                                <Text>Nom</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Stade..."
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                />
                            </View>
                            <View>
                                <Text>Installations</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Lancer, piste"
                                    value={values.description}
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                />
                            </View>
                            <View>
                                <Text>Ville</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    placeholder="Paris"
                                    value={values.city}
                                    onChangeText={handleChange('city')}
                                    onBlur={handleBlur('city')}
                                />
                            </View>
                            <View>
                                <Text>Code postal</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    inputMode={"numeric"}
                                    placeholder="75 / 75001"
                                    keyboardType="numeric"
                                    maxLength={5}
                                    value={values.postalCode}
                                    onChangeText={handleChange('postalCode')}
                                    onBlur={handleBlur('postalCode')}
                                />
                            </View>

                            <View style={{
                                flexDirection: 'row', alignItems: 'center', justifyContent: "space-between"
                            }}>
                                <Text>Accès libre uniquement</Text>
                                <Switch
                                    name="freeAccess"
                                    value={values.freeAccess}
                                    thumbColor={values.freeAccess ? "#ff6600" : "#808080"}
                                    trackColor={{false: 'rgba(128,128,128,0.67)', true: 'rgba(255,102,0,0.67)'}}
                                    onValueChange={(val) => setFieldValue('freeAccess', val)}
                                    onBlur={handleBlur('freeAccess')}
                                />
                            </View>
                            <View>
                                <View>
                                    <Text>Latitude</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        inputMode={"decimal"}
                                        placeholder="43.601"
                                        keyboardType="decimal-pad"
                                        value={values.latitude + ""}
                                        onChangeText={handleChange('latitude')}
                                        onBlur={handleBlur('latitude')}
                                    />
                                </View>
                                <View>
                                    <Text>Longitude</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        inputMode={"decimal"}
                                        placeholder="5.845"
                                        keyboardType="decimal-pad"
                                        value={values.longitude + ""}
                                        onChangeText={handleChange('longitude')}
                                        onBlur={handleBlur('longitude')}
                                    />
                                </View>
                                <View>
                                    <Text>Rayon de recherche (en mètres)</Text>
                                    <TextInput
                                        style={styles.inputStyle}
                                        inputMode={"numeric"}
                                        placeholder="50000"
                                        keyboardType="numeric"
                                        value={values.searchRadius + ""}
                                        onChangeText={handleChange('searchRadius')}
                                        onBlur={handleBlur('searchRadius')}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text>Nombre de résultats maximum</Text>
                                <TextInput
                                    style={styles.inputStyle}
                                    inputMode={"numeric"}
                                    placeholder="200"
                                    keyboardType="numeric"
                                    value={values.resultsLimit + ""}
                                    onChangeText={handleChange('resultsLimit')}
                                    onBlur={handleBlur('resultsLimit')}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleSubmit}
                            >
                                <Text style={styles.buttonText}>Rechercher</Text>
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
