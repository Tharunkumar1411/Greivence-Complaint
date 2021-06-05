import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import { CardBody, CardHeader } from 'reactstrap';

const DoDont = () => {
    return(
        <div>
            <Card className="dodont-card">
                <CardHeader>Do's & Dont's</CardHeader>
                <CardBody>
                    <Card className="dodont-header">DO'S</Card>
                    <CardContent>
                        <ul>
                        <li>Put your campus related complaints here</li>
                        <li>You can give suggetion for your complaints</li>
                        <li>You can see your progress/stats in our platform</li>
                        </ul>
                    </CardContent>

                    <Card className="dodont-header">DONT'S</Card>
                    <CardContent>
                        <ul>
                            <li>Don't put your personal problems here</li>
                            <li>Don't leave unwanted comments</li>
                            <li>Provide valid username and Email details. Don't try to forgery.</li>
                        </ul>
                    </CardContent>
                </CardBody>
            </Card>
        </div>
    )
}

export default DoDont;