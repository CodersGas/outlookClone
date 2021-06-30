import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

const EmptyState = (props) => {

	const {inboxData} = props;

	return(
		<Grid item md={8} xs={12} sm={12} className="emptyState" >
			<Grid container style={{height: '100%'}} >
				<Grid item md={12} xs={12} sm={12} >
					<Box mt={3} display='flex' flexDirection='column' height={1} alignItems='center' justifyContent='center' >
						<Box width={1} display='flex' justifyContent='center' >
							<Box width="400px" height="400px">
								<img 
									src={(inboxData && inboxData.length == 0) ? '/images/nomail.svg' : '/images/envelope.svg'}
									width='100%'
								/>
							</Box>
						</Box>

						<Box width={1} textAlign='center' >
							<Typography className="fontLarge fontBold" >
								{(inboxData && inboxData.length == 0) ? 'No New Mails' : 'Select an Item to read'}
							</Typography>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default EmptyState;