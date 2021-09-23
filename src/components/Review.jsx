import React from 'react';
import UserProvider from "../providers/UserProvider";
import WineReviewForm from './WineReviewForm';

export const Review = () => {
  // const user = useContext(UserContext);
  // const RunType = useLocation().pathname;

  return (
    <UserProvider>
        <div>
            <div>
                <h1>
                    Review
                </h1>                  
            </div>
            <WineReviewForm />
        </div>
    </UserProvider>
  );
}
