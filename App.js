import React from "react"
import { Provider } from 'react-redux'
import store from './src/store' 
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import { Link, NativeRouter, Route } from "react-router-native"
import { StartScreen } from './src/components/screens/startScreen'
import { StatisticsScreen } from './src/components/screens/statisticsScreen'
import { KeptScreen } from './src/components/screens/keptScreen'
import { ResolveScreen } from './src/components/screens/resolveScreen'
import { ResultScreen } from './src/components/screens/resultScreen'
import { START_SCREEN, KEPT_SCREEN, STATISTICS_SCREEN, RESOLVE_SCREEN, RESULT_SCREEN } from './src/components/const'
import { THEME } from './src/theme/theme'

export default function App() {
  const screensConst = [START_SCREEN, KEPT_SCREEN, STATISTICS_SCREEN]
  const image = require('./assets/fon.jpg') 
  return (
    <Provider store={store}>
      <NativeRouter>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.container}>
          <View style={styles.wrapperRouter}>
            <Route exact path={START_SCREEN.path} component={StartScreen} />
            <Route path={KEPT_SCREEN.path} component={KeptScreen} />
            <Route path={STATISTICS_SCREEN.path} component={StatisticsScreen} />
            <Route path={RESOLVE_SCREEN.path} component={ResolveScreen} />
            <Route path={RESULT_SCREEN.path} component={ResultScreen} />
          </View>
          <View style={styles.nav}>
            {screensConst.map(screen => (
              <Link key={screen.path} to={screen.path}  underlayColor={THEME.background.tertiary}>
                <View style={styles.navItem}>
                <Image
                  style={styles.navImg}
                  source={screen.image}
                />
                <Text>{screen.title}</Text>
                </View>
              </Link>
            ))
            }
          </View>
        </View>
        </ImageBackground>
      </NativeRouter>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: THEME.background.primary,
  },
  wrapperRouter: {
    flex: 1,
  },
  nav: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: THEME.background.primary,
    height: 90,
  },
  navItem: {
    justifyContent: "center",
    alignItems:  "center", 
    padding: 15,   
  },
  navImg: {
    width: 30,
    height: 30,
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: "cover",
    justifyContent: "center"
  },
});
