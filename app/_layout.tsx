import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useFrameworkReady} from '@/hooks/useFrameworkReady';

import {SessionProvider} from '@/auth/context';
import {SplashScreenController} from '@/auth/loading';

export default function RootLayout() {
    useFrameworkReady();


    return (<SessionProvider>
            <SplashScreenController/>
            <RootNavigator/>
        </SessionProvider>);
}


// Create a new component that can access the SessionProvider context later.
function RootNavigator() {
    return <>
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="(tabs)"/>
        </Stack><StatusBar style="auto"/>
    </>;
}