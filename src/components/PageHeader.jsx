import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';
import HeaderSignedIn from './Header_SignedIn';
import HeaderSignedOut from './Header_SignedOut';

export default function PageHeader() {
    const user = useContext(UserContext);

    if (user) {
        return(
            <div>
                <HeaderSignedIn />
            </div> 
        );
    } else {
        return(
            <div>
                <HeaderSignedOut />
            </div>
        );
    }
};
