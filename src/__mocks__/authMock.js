const authMock = jest.fn(() => {
  return {
    createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() =>
      Promise.resolve(true)
    ),
    sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
    signInAndRetrieveDataWithEmailAndPassword: jest.fn(() =>
      Promise.resolve(true)
    ),
    fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
    signOut: jest.fn(() => {
      Promise.resolve(true);
    }),
    onAuthStateChanged: jest.fn(),
    signIn: jest.fn(() => {
      Promise.resolve(true);
    }),
    signInWithGoogle: jest.fn(() => {
      Promise.resolve(true);
    }),
    signInWithEmailAndPassword: jest.fn(() => {
      Promise.resolve(true);
    }),    
    currentUser: {
      sendEmailVerification: jest.fn(() => Promise.resolve(true)),
      email: "testuser@fakeemail.com",
      userId: "fakeuserIdfortestingonly",
      displayName: "Fake DisplayName",
    }
  };
});

export { authMock };