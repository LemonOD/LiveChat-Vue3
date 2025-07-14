import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'
import getUser from './getUser'

const getCollection = (collection) => {
  const documents = ref(null)
  const error = ref(null)
  const { user } = getUser()

  const showNotification = (title, body) => {
    if (Notification.permission === 'granted') {
      new Notification(title, { body })
    }
  }

  // register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection).orderBy('createdAt')

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = []
      snap.docChanges().forEach((change) => {
        if (change.type === 'added' && change.doc.data().createdAt) {
          const message = change.doc.data()
          if (user.value && message.name !== user.value.displayName) {
            showNotification('New Message', `${message.name}: ${message.message}`)
          }
        }
      })

      snap.docs.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        // we don't want to edit data until it has done this
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id })
      })

      // update values
      documents.value = results
      error.value = null
    },
    (err) => {
      console.log(err.message)
      documents.value = null
      error.value = 'could not fetch the data'
    }
  )

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub())
  })

  return { error, documents }
}

export default getCollection
