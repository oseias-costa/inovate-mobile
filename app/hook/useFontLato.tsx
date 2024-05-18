import { useFonts, Lato_400Regular, Lato_300Light, Lato_700Bold } from '@expo-google-fonts/lato';

export default function useFontLato(){
    let [fontsLoades] = useFonts({
        Lato_700Bold,
        Lato_400Regular,
        Lato_300Light,
      });

      return fontsLoades
}