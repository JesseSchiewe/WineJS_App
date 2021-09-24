import React from 'react';
import UserProvider from "../providers/UserProvider";
import WineReviewForm from './WineReviewForm';

export const Review = () => {
  
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
