import React from 'react';
import { useForm } from 'react-hook-form';

// const { register, handleSubmit, errors } = useForm();

// function onSubmit(data) {
//     alert("Clicked submit on outputForm");
// }

export default function outputForm(reviewData) {
    return (
        <form>
            <div className="WineJS Wine Review">
                <h1>Interactive Output Form</h1>
                <h2>Balance: {reviewData.Balance}</h2>
                <h2>Balance Notes: {reviewData.BalanceNotes}</h2>
                <h2>FlavorCharacteristics: {reviewData.FlavorCharacteristics}</h2>
                <h2>WineName: {reviewData.WineName}</h2>
                <h2>Tasting Notes: {reviewData.TastingNotes}</h2>
            </div>
        </form>
    );
}
