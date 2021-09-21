import firebase from 'firebase';

export const GetReviewData = (dbpathref) => {    
    let firebaseData = ''

    console.log("Checking for Review Data from FireBase")
    firebase.database().ref(dbpathref).on('value', (snapshot) => {
        firebaseData = snapshot.val();
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(firebaseData), 1000) 
    })
}
