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
            <div className="p-4">
                <Card className="border-1">
                    <CardBody className="p-0">
                        <div className="d-flex justify-content-between align-items-center border-bottom title">
                            <CardTitle tag="h5" className="mb-0">Users Details</CardTitle>
                            <Button variant="resetSqare" onClick={() => setCallAPI(!callAPI)} disabled={isLoading} title={"Refersh User List"} />
                        </div>
                        <div className="custHeight">
                            <Table className="no-wrap align-middle scrollWidth" responsive borderless>
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
                                                    <div className="d-flex align-items-center">
                                                        <img
                                                            src={item ?.thumbnail}
                                                            className="rounded-circle"
                                                            alt="avatar"
                                                            width="35"
                                                            height="35"
                                                        />
                                                        <div className="ms-3">
                                                            <span className="mb-0">{item ?.name ?.title} {item ?.name ?.first} {item ?.name ?.last}</span>

                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="td-cntr"><span>{item ?.email}</span></td>
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
