import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'


const User = () => {
    return (
        <>
            {/* header */}
            <Header/>
            {/* main content */}
            <main>
                <Outlet/>
            </main>
            

            {/* footer */}
            <Footer/>
        </>
    )
}

export default User
