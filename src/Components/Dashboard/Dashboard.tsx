import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '../../utils/Button';
import Loading from '../../utils/Loading';

interface UserData {
    name: string;
    email: string;
    image: string;
};


const Dashboard = () => {

    //State
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        name: "",
        email: "",
        image: ""
    })
    const [callAPI, setCallAPI] = useState(false);


    useEffect(() => {
        const getUserData = async () => {
            setIsLoading(true);
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}`).then((response: any) => {
                let stroedData = [];
                stroedData = response ?.data ?.results ?.[0];
                localStorage.setItem('userData', JSON.stringify(stroedData));

                setUserData({
                    ...userData,
                    name: `${stroedData ?.name ?.title} ${stroedData ?.name ?.first} ${stroedData ?.name ?.last}`,
                    email: stroedData ?.email,
                    image: stroedData ?.picture ?.large,
                });
            })
                .catch((error: any) => {
                    console.log("Error Comming !!!!!")
                })
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
        }
        getUserData();
        // eslint-disable-next-line
    }, [callAPI])

    return (
        <Fragment>
            {isLoading && <Loading />}
            <div className="p-4">

                <div className="d-flex justify-content-between align-items-center border-bottom title">
                    <h5 className="mb-0">Users Details</h5>
                    <Button variant="resetSqare" onClick={() => setCallAPI(!callAPI)} disabled={isLoading} title={"Refersh User List"} />
                </div>
                <div className="justify-content-center d-flex mt-5">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={userData ?.image} alt="avatar" />
                        </div>
                        <h2 className="profile-username">{userData ?.name}</h2>
                        <small className="profile-user-handle">{userData ?.email}</small>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}

export default Dashboard