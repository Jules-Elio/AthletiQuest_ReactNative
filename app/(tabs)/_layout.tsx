import {Tabs} from 'expo-router';
import {Calendar, Globe as Home, LogInIcon, User, Users} from 'lucide-react-native';
import {useSession} from "@/auth/context";

export default function TabLayout() {

    const { sessionToken } = useSession();

    return (<Tabs
            screenOptions={{
                headerShown: false, tabBarActiveTintColor: '#ff6600', tabBarInactiveTintColor: '#777777', tabBarStyle: {
                    backgroundColor: '#D3D3D3', paddingBottom: 8, paddingTop: 10, height: 75,
                }, tabBarLabelStyle: {
                    fontSize: 12, fontWeight: '200',
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Accueil', tabBarIcon: ({size, color}) => (<Home size={size} color={color}/>),
                }}
            />
            <Tabs.Screen
                name="events"
                options={{
                    title: 'Événements', tabBarIcon: ({size, color}) => (<Calendar size={size} color={color}/>),
                }}
            />

        <Tabs.Protected guard={!!sessionToken}>
            <Tabs.Screen
                name="community"
                options={{
                    title: 'Communauté', tabBarIcon: ({size, color}) => (<Users size={size} color={color}/>),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil', tabBarIcon: ({size, color}) => (<User size={size} color={color}/>),
                }}
            />
        </Tabs.Protected>

        <Tabs.Protected guard={!sessionToken}>
            <Tabs.Screen
                name="connect"
                options={{
                    title: 'Connexion', tabBarIcon: ({size, color}) => (<LogInIcon size={size} color={color}/>),
                }}
            />
        </Tabs.Protected>


        </Tabs>);
}