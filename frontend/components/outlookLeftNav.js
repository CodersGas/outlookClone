import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@material-ui/core';
import { outlookNavigation } from 'utils/constants';
import { makeStyles } from '@material-ui/core/styles';
import Cookie from 'js-cookie';

const useStyles = makeStyles(theme => ({
	selected: {
		color: '#2196f3'
	}
}))

const OutlookLeftNavigation = (props) => {

	const classes = useStyles();

	const [unreadCounts, setUnreadCounts] = useState({
		'inbox': 0,
		'spam': 0
	});

	useEffect(() => {

		if(props.unreadCountsFetched) {
			let unreadCountObj = Cookie.get('unreadCounts');
			unreadCountObj = JSON.parse(unreadCountObj);
			
			setUnreadCounts({
				'inbox': unreadCountObj.inbox,
				'spam': unreadCountObj.spam
			});
		}

	}, [props.unreadCountsFetched]);

	useEffect(() => {
		if(props.updateInboxCount) {
			setUnreadCounts({
				...unreadCounts,
				'inbox': unreadCounts.inbox - 1
			});
		}

		return () =>  {
			if(props.resetUpdateInboxCountState) {
				props.resetUpdateInboxCountState();
			}
		}
	}, [props.updateInboxCount]);

	useEffect(() => {

		if(props.updateSpamCount) {
			setUnreadCounts({
				...unreadCounts,
				'spam': unreadCounts.spam - 1
			})
		}

		return () =>  {
			if(props.resetUpdateSpamCountState) {
				props.resetUpdateSpamCountState();
			}
		}
	}, [props.updateSpamCount])

	return(
		<React.Fragment>
			<List component="nav" disablePadding={true} style={{borderRight: '1px solid #e8e8e8', height: '100%'}} >
				{
					outlookNavigation.map((navItem) => (
						<Box width={1} position='relative' key={navItem.page} >
							<Link href={navItem.link} passHref >
								<ListItem button >
			                        <ListItemIcon className={props.page === navItem.page ? classes.selected : null} >
			                            {navItem.icon}
			                        </ListItemIcon>
			                        <ListItemText primary={navItem.title} className={props.page === navItem.page ? classes.selected : null} />
			                    </ListItem>
		                    </Link>

		                    {
		                    	unreadCounts[navItem.page] > 0 &&
		                    	<Box 
			                    	position='absolute' 
			                    	right={11} 
			                    	bottom={11} 
			                    	width={20}
			                    	height={20}
			                    	color="#fff"
			                    	style={{backgroundColor: '#2196f3'}}
			                    	textAlign='center'
			                    	borderRadius='10px'
			                    >
			                    	<Typography className="fontSmallest" >
			                    		{unreadCounts[navItem.page]}
			                    	</Typography>
			                    </Box>
		                	}

	                    </Box>
					))
				}
			</List>
		</React.Fragment>
	)
}

export default OutlookLeftNavigation;