import { NavigateNext } from '@mui/icons-material';
import { Breadcrumbs, Link } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

const BreadCrumbs = () => {
    const location = useLocation();
    const path = location.pathname;
    const crumbs = path.split('/').filter((crumb) => crumb !== '');

    return (
        // <nav>
        //     <ul>
        //         <li>
        //             <Link to="/">Home</Link>
        //         </li>
        //         {crumbs.map((crumb, index) => (
        //             <li key={index}>
        //                 <Link to={`/${crumbs.slice(0, index + 1).join('/')}`}>{crumb}</Link>
        //             </li>
        //         ))}
        //     </ul>
        // </nav>
        <Breadcrumbs
            separator={<NavigateNext fontSize="small" />}
            aria-label="breadcrumb"
            style={{width:'auto', height:'fit-content', margin:'20px 0px', padding:'10px 20px', background:'rgba(243, 214, 7, 0.157)', borderRadius:'5px'}}
        >
            <Link underline="hover" key="1" color="inherit" href="/">
                Home
            </Link>
            {crumbs.map((crumb, index) => (
            <Link
                underline="hover"
                key="2"
                color="inherit"
                href={`/${crumbs.slice(0, index + 1).join('/')}`}
            >
                {crumb}
            </Link>
            ))}
        </Breadcrumbs>
    );
};

export default BreadCrumbs;