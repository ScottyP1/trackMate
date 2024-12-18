'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import { Context as AuthContext } from "@/context/AuthContext";
import logo from '../../public/images/logo.png';

const pages = ['Tracks', 'About', 'How To', 'Donate'];

function NavBar() {
    const [menuAnchor, setMenuAnchor] = React.useState(null);
    const { state, loadToken } = React.useContext(AuthContext);
    const pathname = usePathname();

    React.useEffect(() => {
        loadToken();
    }, [state.token]);

    const handleMenuOpen = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 10 }}>
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 65,
                    px: 2,
                }}
            >
                {/* Left Side: Menu Icon for Mobile */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'start', alignItems: 'center' }}>
                    <IconButton
                        size="large"
                        aria-label="menu"
                        onClick={handleMenuOpen}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        {pages.map((page) => (
                            <Link key={page} href={`/${page}`} passHref>
                                <MenuItem onClick={handleMenuClose}>{page}</MenuItem>
                            </Link>
                        ))}
                    </Menu>
                </Box>

                {/* Centered Logo on Mobile Screens */}
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }} className='mr-12'>
                    <Link href="/" passHref >
                        <Image src={logo} width={120} height={45} alt="Logo" />
                    </Link>
                </Box>

                {/* Left Side: Logo and Navigation Links on Desktop */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'start', alignItems: 'center', gap: 3 }}>
                    <Link href="/" passHref>
                        <Image src={logo} width={120} height={45} alt="Logo" />
                    </Link>
                    {pages.map((page) => (
                        <Link key={page} href={`/${page}`} passHref>
                            <Button sx={{ color: 'white' }}>
                                {page}
                            </Button>
                        </Link>
                    ))}
                </Box>

                {/* Right Side: Login/Sign Up */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {!state.token && pathname === '/' && (
                        <>
                            <Link href="/Login" passHref>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        borderColor: 'blue',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        ':hover': { backgroundColor: 'rgba(0, 0, 255, 0.1)' },
                                    }}
                                >
                                    Login
                                </Button>
                            </Link>
                            <Link href="/Register" passHref>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        ':hover': { backgroundColor: 'darkblue' },
                                    }}
                                >
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
