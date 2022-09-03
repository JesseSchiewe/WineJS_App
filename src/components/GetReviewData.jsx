import { getDatabase, ref, get } from 'firebase/database';

export const GetReviewData = (dbpathref) => {    
    let firebaseData = ''
    const db = getDatabase();

    get(ref(db, dbpathref)).then((snapshot) => {
        firebaseData = snapshot.val();
    });

    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(firebaseData), 1000) 
    });
};
