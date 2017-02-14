import {
  StyleSheet
} from 'react-native'
import { styleColor } from 'react-chunky'

export const containers = (theme) => StyleSheet.create({
  centered: {
   alignItems: 'center',
   justifyContent: 'center',
   padding: 8,
  },
  form: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleColor(theme.backgroundColor),
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
