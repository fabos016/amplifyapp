import { useState, useEffect } from 'react';
import { API } from "aws-amplify";
import { listEvents } from "../graphql/queries";

const ListEvent = () => {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const allEvents = await API.graphql({query: listEvents});

            setData(allEvents);
        };

        fetchData();
    }, []);


    if (data) {
        return <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Start Time</th>
                    <th>Duration</th>
                    <th>Required</th>
                </tr>
            </thead>
            
            <tbody>{data.data.listEvents.items.map(record => {
                return (<tr key={record.startTime + Math.random()}>
                    <td> { record.name } </td>
                    <td> { record.description } </td>
                    <td> { record.startTime } </td>
                    <td> { record.durationMinutes } </td>
                    <td> { record.isRequired.toString() } </td>
                </tr>)
            })}</tbody>
        </table>
    }
};

export default ListEvent