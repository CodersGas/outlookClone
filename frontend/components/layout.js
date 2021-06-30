import React, { useEffect } from 'react';
import {  } from '@material-ui/core';
import AppNavigation from 'components/appNavigation';
import Router from 'next/router';

const Layout = ({children, user}) => {
	return(
		<React.Fragment>
			<div className='layout' >
				<AppNavigation user={user} />

				<div style={{height: '100%'}} >
					{children}
				</div>
			</div>
		</React.Fragment>
	)
}

export default Layout;