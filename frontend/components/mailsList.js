import React, { useState } from 'react';
import { Grid, ListItem, ListItemText, Typography, Box, Button, Link, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	unreadMailSubject: {
		color: '#2196f3',
		fontSize: '18px',
		fontWeight: 500
	},
	unreadMailContent: {
		color: '#2196f3',
		fontSize: '12px',	
	},
	listItemStyle: {
		position: 'relative'
	}
}))

const MailsListItem = (props) => {
	const classes = useStyles();

	const [showDetailButton, setShowDetailButton] = useState(false);

	const onMailItemClick = (unread) => {
		props.updateSelectedMailIndex(props.index);

		if(unread) {
			if(props.updateSpamDataAndUnreadCount) {
				props.updateSpamDataAndUnreadCount(props.index);
			}else if(props.updateInboxDataAndUnreadCount) {
				props.updateInboxDataAndUnreadCount(props.index);
			}
		}
	}

	let buttonURL = `/mailDetail/${props.data.mId}?type=${props.type}`;

	return(
		<Grid item md={12} xs={12} sm={12} >
			<ListItem className={classes.listItemStyle} button onClick={() => onMailItemClick(props.data.unread)} onMouseEnter={() => setShowDetailButton(true)} onMouseLeave={() => setShowDetailButton(false)} >
	            <ListItemText 
	            	primary={
	            		<Typography className={!props.data.unread ? "fontBold fontLarge" : classes.unreadMailSubject} >
	            			{props.data.subject}
	            		</Typography>
	            	}
	            	secondary={
	            		<Typography className={!props.data.unread ? "fontSmallest" : classes.unreadMailContent}>
	            			{props.data.content.substr(0, 100)}...

	            			<Link href={buttonURL} target='_blank' className='fontBold fontSmall mailDetailBtn' >
		            			<span >
		            				Show Detail
		            			</span>
	            			</Link>
	            		</Typography>
	            	}
	            />

	            {
	            	showDetailButton &&
	            	<Tooltip 
	            		arrow
	            		title={<Typography>It will redirect to dynamically generated detail page</Typography>}
	            		position="top"
	            	>
		            	<Box position='absolute' right={0} bottom={0} className="hoverMailDetailBtn" >
			            	<Button disableElevation color='primary' size='small' variant='contained' href={buttonURL} target='_blank' >
			            		Show Detail
			            	</Button>
			            </Box>
		            </Tooltip>
	        	}

	        </ListItem>
		</Grid>
	)
}

const MailsList = (props) => {

	const {inboxData, updateSelectedMailIndex, updateInboxDataAndUnreadCount, updateSpamDataAndUnreadCount, type} = props;

	return(
		<Grid item md={4} xs={12} sm={12} >
			<Grid container >
				{
					(inboxData && inboxData.length) ? 
					inboxData.map((data, index) => (
						<MailsListItem 
							data={data} 
							key={data.mId} 
							index={index} 
							updateSelectedMailIndex={updateSelectedMailIndex}
							updateInboxDataAndUnreadCount={updateInboxDataAndUnreadCount}
							updateSpamDataAndUnreadCount={updateSpamDataAndUnreadCount}
							type={type}
						/>
					))
					:

					<Box mt={2} width={1} textAlign='center' >
						<Typography className='fontBold' >
							No Deleted Mails
						</Typography>
					</Box>
				}
			</Grid>
		</Grid>
	)
}

export default MailsList;