import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';

const MailDetail = (props) => {

	const {data} = props;

	return(
		<Grid item md={8} xs={12} sm={12} id="mailDetailContainer" >
			<Grid container >
				<Grid item md={12} xs={12} sm={12} >
					<Box my={2} >
						<Typography color='primary' className='fontBold fontLarge' >
							{data.subject}
						</Typography>
					</Box>
				</Grid>

				<Grid item md={12} xs={12} sm={12} >
					<Box my={2} >
						<Typography className='fontMedium' >
							{data.content}
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default MailDetail;