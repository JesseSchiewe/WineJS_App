import React, {Fragment} from 'react';

export const About = () => (
    <Fragment>
        <div className="WineJS Wine Review">
            <h1>About</h1>
            <h2>About WineJS</h2>
            <div className="standardText" >
                This is a first attempt at building a wine review app using Reactjs.
                <p/>
                Currently, you can review wines and save your scores and comments. You can also view any past reviews in the "results" section.
                <p/>
                New features, updates, and fixes will be coming soon.
            </div>
        </div>
    </Fragment>
  );