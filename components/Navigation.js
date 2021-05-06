import Link from 'next/link';
import React from 'react';

function Navigation() {


    return (
        <div className="navigation">
            <div className="navigationContainer">
                <ul>
                    <li>
                        <Link className="logo" href="/">
                            <a>Logo</a>
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