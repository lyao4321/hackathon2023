import React from 'react';
import CompanyRegister from './CompanyRegister';
import RegisterBar from './RegisterBar';

const CompanyRegisterFull: React.FC = () => {
    return (
        <>
        <RegisterBar isCompany={true} />
        <CompanyRegister/>
        </>

    );
}

export default CompanyRegisterFull;
