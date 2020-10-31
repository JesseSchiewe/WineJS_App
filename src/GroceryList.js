export const createGroceryList = (userName) => {
    return db.collection('groceryLists')
        .add({
            created: firebase.firestore.FieldValue.serverTimestamp(),
            users: [{ name: userName}]
        });
};