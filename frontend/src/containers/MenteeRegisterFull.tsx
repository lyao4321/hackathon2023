import React from 'react';
import RegisterBar from './RegisterBar';
import Register from './Register';

const MenteeRegisterFull: React.FC = () => {
    return (
        <>
        <RegisterBar isCompany={false} />
        <Register />
        </>
    );
}

export default MenteeRegisterFull;
