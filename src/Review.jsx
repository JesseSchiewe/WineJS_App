import React, { useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import UserProvider, { UserContext } from "./providers/UserProvider";
import WineReviewForm from './WineReviewForm';

export const Review = () => {
  const user = useContext(UserContext);
  const RunType = useLocation().pathname;

  return (
    <UserProvider>
        <div>
            <div>
                <h1>
                    Review
                </h1>                  
            </div>

            {/* <CreateReviewForm user={user}/> */}
            <WineReviewForm />

        </div>
    </UserProvider>
  );
}
