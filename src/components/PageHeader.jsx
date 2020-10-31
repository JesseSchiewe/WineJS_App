import { useContext } from 'react';
//import Select from 'react-select'
//import { Link } from "react-router-dom";
//import {auth} from "../Firebase";
import { UserContext } from '../providers/UserProvider';
//import Review from '../Review';
import HeaderSignedIn from './Header_SignedIn';
import HeaderSignedOut from './Header_SignedOut';


export default function PageHeader() {
    const user = useContext(UserContext);

    return(
        user ?
            HeaderSignedIn()

        :
            HeaderSignedOut()
    )
};
