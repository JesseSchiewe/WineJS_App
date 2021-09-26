import HeaderSignedIn from './Header_SignedIn';

export default function PageHeader() {
    // const user = useContext(UserContext);

    // if (user) {
    //     return(
    //         <div>
    //             <HeaderSignedIn />
    //         </div> 
    //     );
    // } else {
    //     return(
    //         <div>
    //             <HeaderSignedOut />
    //         </div>
    //     );
    // }

    return (
        <HeaderSignedIn />
    )
};
