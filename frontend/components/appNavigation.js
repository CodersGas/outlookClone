import React, { useState } from 'react';
import { Grid, AppBar, Toolbar, Typography, Button, IconButton, Box } from '@material-ui/core';
import Cookie from 'js-cookie';
import Router from 'next/router';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
// import MenuIcon from '@material-ui/icons/Menu';
import MobileMenu from 'components/mobileMenu';

const AppNavigation = (props) => {

	let user = null;

	if(props.user) {
		user = props.user
	}

	const buttonText = user && user.email ? 'Log Out' : '';

	const [showButtonIcons, setShowButtonIcons] = useState(false);

	const handleMouseEnter = () => {
	    setShowButtonIcons(true);
	}

	const handleMouseLeave = () => {
	    setShowButtonIcons(false);
	}

	const onLogout = () => {
		Cookie.remove('user');
		Cookie.remove('unreadCounts');
		Router.push('/');
	}

	return(
		<div>
			<AppBar color='primary' elevation={0} position='static' >
				<Toolbar style={{justifyContent: 'space-between'}} >

					<Box display='flex' alignItems='center' >
						{
							<div id="mobileMenu" >
								<MobileMenu />
							</div>
						}

						<Box ml={1} >
							<Typography className="fontMedium fontBold" >
								Outlook
							</Typography>
						</Box>
					</Box>

					<Button 
						style={{color: '#fff'}} 
						onClick={onLogout} 
						onMouseEnter={handleMouseEnter} 
						onMouseLeave={handleMouseLeave} 
						endIcon={showButtonIcons && <ArrowForwardIcon />} 
					>
						{buttonText}
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default AppNavigation;