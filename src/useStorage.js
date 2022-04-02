import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'

const useStorage = () => {
  var fileURL = ''
  function uploadFile(file) {
    const storage = getStorage()
    const filePath = `submit_doc/${file.name}`
    try {
      const storageRef = ref(storage, filePath)
      const uploadTask = uploadBytesResumable(storageRef, file)
      
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (downloadURL) {
              fileURL = downloadURL
              sessionStorage.setItem('downloadURL', downloadURL)
            }
          })
        },
      )
    } catch (error) {}
  }
  return { uploadFile, fileURL }
}

export default useStorage
