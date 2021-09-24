import React, {Fragment} from 'react';

export const About = () => (
    <Fragment>
        <div className="WineJS Wine Review" data-testid="About">
            <h1>About</h1>
            <h2>About WineJS</h2>
            <div className="standardText" >
                <p>
                    This is a first attempt at building a wine review app using Reactjs.
                </p>
                <p>
                    I made this app because I love wine and I wanted a way to easily record my thoughts and impressions about the wines I have tried.
                    It is tough for me to remember specific details about a wine even a day or so after drinking it, so this helps me to compare notes about wines I have enjoyed in the past.
                    This also helps me to make better purchasing decisions in the future as I am able to see what I have enjoyed and find my favorite wine within a certain price range.
                    I hope this app helps you to enjoy your wine more and that you will find new favorites in the near future!
                </p>
                <p>
                    Currently, you can review wines and save your scores and comments. You can also view any past reviews in the "results" section.
                </p>
                <p>
                    New features, updates, and fixes will be coming soon.
                </p>
            </div>
        </div>
    </Fragment>
  );