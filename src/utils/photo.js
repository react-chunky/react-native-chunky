import { default as ImagePicker } from 'react-native-image-picker'

export function choosePhoto(title) {
  return new Promise((resolve, reject) => {
    ImagePicker.showImagePicker({ title,
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
    }, (response) => {
      if (response.error) {
        reject(response.error)
        return
      }

      resolve(response.didCancel ? "" : response.data)
    })
  })
}
