import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppContext } from '../context/store';


function Navigation() {
    const { setLogOut } = useAppContext();
    const { logout } = useAuth0();

    const handleLogout = async () => {
        await setLogOut(true);
        logout({ returnTo: window.location.origin });
    }


    return (
        <div className="navigation">
            <div className="navigationContainer">
                <ul>
                    <li>
                        <Link className="logo" href="/">
                            <a><Image src='/TIKI_logo_black.png' width={100} height={33}/>
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="">
                            <a className="navLink" onClick={() => handleLogout()}>Logout</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard">
                            <a className="navLink">Dashboard</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/payment">
                            <a className="navLink">Payment</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/application">
                            <a className="navLink">Application</a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default Navigation;