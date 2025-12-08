import React from 'react';
import {Image, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import logo from '../../assets/images/icon.png';
import {useSession} from '@/auth/context';

export default function Connect() {

    const [isCreating, setIsCreating] = React.useState(false);
    const {signIn, register} = useSession();

    const loginValidationSchema = yup.object().shape({
        username: (isCreating ? yup.string().required("Nom d'utilisateur requis") : yup.string().nullable()),
        email: yup
            .string()
            .email("Adresse email invalide")
            .required("Email requis"),
        password: yup
            .string()
            .min(8, ({min}) => `Le mot de passe doit être d'au moins ${min} caractères`)
            .required("Mot de passe requis"),
    });

    return (<View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Connexion</Text>
            <Switch
                value={isCreating}
                thumbColor={"#ff6600"}
                trackColor={{false: 'rgba(255,102,0,0.50)', true: 'rgba(255,102,0,0.50)'}}
                onValueChange={() => setIsCreating(!isCreating)}
            />
            <Text style={styles.headerText}>Inscription</Text>
        </View>
        <ScrollView contentContainerStyle={styles.body}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.title}>{isCreating ? "Créer un compte" : "Se connecter"}</Text>
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={{username: '', email: '', password: ''}}
                onSubmit={(values => {
                    if (isCreating) {
                        register(values.username, values.email, values.password);
                    } else {
                        signIn(values.email, values.password);
                    }
                })}
            >
                {({
                      handleChange, handleBlur, handleSubmit, values, errors, touched, isValid,
                  }) => (<>
                    {isCreating ? (<>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nom d'utilisateur"
                                autoCapitalize={"none"}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        {errors.username && touched.username && (
                            <Text style={styles.errorText}>{errors.username}</Text>)}
                    </>) : ""}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize={"none"}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
                    {errors.email && touched.email && (<Text style={styles.errorText}>{errors.email}</Text>)}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Mot de passe"
                            secureTextEntry
                            autoCapitalize={"none"}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                        />
                    </View>
                    {errors.password && touched.password && (<Text style={styles.errorText}>{errors.password}</Text>)}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>{isCreating ? "Créer mon compte" : "Me connecter"}</Text>
                    </TouchableOpacity>
                </>)}
            </Formik>
        </ScrollView>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: '#F5F5F5',
    }, body: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', paddingHorizontal: 20,
    }, header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: '#F5F5F5',
    }, logo: {
        height: 200, width: 200, resizeMode: 'contain', marginBottom: 20,
    }, title: {
        fontSize: 32, marginBottom: 40, fontWeight: 'bold', color: 'black',
    }, headerText: {
        fontSize: 24, fontWeight: 'bold', color: 'black',
    }, inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    }, icon: {
        marginRight: 10,
    }, input: {
        flex: 1, height: '100%',
    }, forgotPassword: {
        alignSelf: 'flex-end', marginBottom: 20, color: '#000',
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
    }, signUp: {
        color: '#000',
    }, signUpLink: {
        color: '#ff6600',
    }, errorText: {
        color: 'red', alignSelf: 'flex-start', marginBottom: 10,
    }, section: {
        flexDirection: 'row', alignItems: 'center',
    }, paragraph: {
        fontSize: 15,
    }, checkbox: {
        margin: 8,
    },
});