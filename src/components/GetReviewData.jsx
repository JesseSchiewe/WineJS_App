// import firebase from 'firebase';
import firebase from 'firebase/compat/app';

export const GetReviewData = (dbpathref) => {    
    let firebaseData = ''

    firebase.database().ref(dbpathref).on('value', (snapshot) => {
        firebaseData = snapshot.val();
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(firebaseData), 1000) 
    });
};
