import { collection, getDocs } from "firebase/firestore"; 

async function getAllDocuments(db, collectionName){
const querySnapshot = await getDocs(collection(db, collectionName));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
}


export { getAllDocuments };