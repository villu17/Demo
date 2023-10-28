import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Table } from "reactstrap";
import Button from '../../utils/Button';
import Loading from '../../utils/Loading';


const Dashboard = () => {

    //State
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState<any[]>([])
    const [callAPI, setCallAPI] = useState(false);


    useEffect(() => {
        const getUserData = async () => {
            setIsLoading(true);
            await axios.get(`${process.env.REACT_APP_API_ENDPOINT}`).then((response: any) => {
                let stroedData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "") : [];
                stroedData = [...stroedData, response ?.data ?.results ?.[0]];
                localStorage.setItem('userData', JSON.stringify(stroedData));

                let finalData: any = [];
                stroedData ?.forEach((item: any) => {
                    finalData ?.push({ name: item.name, email: item.email, thumbnail: item.picture ?.thumbnail })
                })
                setUserData(finalData);
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
            <div className="p-5">
                <Card className="border-0">
                    <CardBody>
                        <div className="d-flex justify-content-between">
                            <CardTitle tag="h5">Users Details</CardTitle>
                            <Button variant="resetSqare" onClick={() => setCallAPI(!callAPI)} disabled={isLoading} title={"Refersh User List"} />
                        </div>
                        <div className="custHeight scrollWidth mt-3">
                            <Table className="no-wrap mt-3 align-middle" responsive borderless>
                                <thead>
                                    <tr>
                                        <th >Name</th>
                                        <th className="td-cntr">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userData && userData ?.map((item: any, index: number) => (
                                            <tr key={index} className="border-top">
                                                <td >
                                                    <div className="d-flex align-items-center p-2">
                                                        <img
                                                            src={item ?.thumbnail}
                                                            className="rounded-circle"
                                                            alt="avatar"
                                                            width="45"
                                                            height="45"
                                                        />
                                                        <div className="ms-3">
                                                            <h6 className="mb-0">{item ?.name ?.title} {item ?.name ?.first} {item ?.name ?.last}</h6>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="td-cntr"><h6>{item ?.email}</h6></td>
                                            </tr>
                                        ))
            }

                                </tbody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </Fragment>
    )
}

export default Dashboard
