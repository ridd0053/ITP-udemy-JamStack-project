import React, { useContext } from "react";
import Button from "@material-ui/core/Button";


import Layout from "../components/ui/layout";
import AuthPortal from "../components/auth/AuthPortal";
import { UserContext } from "../contexts";
import { setUser } from "../Contexts/actions";

export default function Account() {
    const { user, dispatchUser, defaultUser } = useContext(UserContext)

    const handleLogout = () => {
        dispatchUser(setUser(defaultUser))
    }

    return (
        <Layout>
            { user.jwt && user.onboarding ? <Button variant="contained" onClick={handleLogout}>Logout</Button> : <AuthPortal />}
        </Layout>
    )
}