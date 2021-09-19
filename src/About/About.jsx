
import React from "react";
import TopNavBar from "../ComplaintContainer/TopNavBar"
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    para:{
        lineHeight:"2",
        padding:"1rem", 
        fontSize:"1.5rem",
        textIndent:"5rem", 
        overflow:"hidden",
        width:"100%", 
        fontFamily:"monospace"
    }
}))

const About = () => {
    const classes = useStyles();
    return(
        <div>
            <TopNavBar />

            <div style={{paddingTop:"5rem"}}>
                <h2 style={{textAlign:"center"}}>Grievence</h2>

                <p className={classes.para} >
                    Is a formal complaint that is raised by an employee towards an employer within the workplace. There are many reasons as to why a grievance can be raised, and also many ways to go about dealing with such a scenario. Reasons for filing a grievance in the workplace can be as a result of, but not limited to, a breach of the terms and conditions of an employment contract, raises and promotions, or lack thereof, as well as harassment and employment discrimination.<br />
                </p>

                <p className={classes.para} >
                    According to Sean C. Doyle, in his work titled, The Grievance Procedure: The Heart of the Collective Agreement, the grievance process takes on certain secondary roles in countries such as Canada, United States and the United Kingdom that can include, but are not limited to, "a mechanism for the extension of the relationship between the parties, a union tactic to pressure management for strategic purposes, a diagnostic device to uncover underlying problems in the workplace, a mechanism for individual employees or union officials to challenge management over a range of working conditions, or even a forum for the communication of information
                </p>

                <p className={classes.para} >
                    A grievance between an employee and employer can be dealt with either informally or formally, and sometimes both approaches are taken in search of a resolution. In the informal approach, an employee can informally bring forth a concern promptly to his or her employer. Here a discussion or similar between the two parties can result in a mutually agreed upon resolution. In the case that this step fails or is skipped altogether, a grievance can be raised formally, where formal meetings and options for appeals become available                
                </p>

                <p className={classes.para} >
                    Workplaces that have trade union representation often file a grievance with an employer on behalf of an individual employees request. According to the Union of Northern Workers, "Grievances are filed by the union on behalf of its members. Most of the grievances filed by unions are filed on behalf of individual employees (individual grievances) or on behalf of a group of employees (group grievances). A third type of grievance is the policy grievance which deals with issues that affect all employees"                 
                </p>
            </div>
        </div>
    )
}

export default About;