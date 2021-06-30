const getInboxData = '/api/getInboxMails';
const getUnreadCounts = '/api/getUnreadCounts';
const getSpamData = '/api/getSpamMails';
const getDeletedMails = '/api/getDeletedMails';
const getInboxMailDetail = '/api/getInboxMailDetail';
const getSpamMailDetail = '/api/getSpamDetail';

const createAPIUrl = (endpointName) => {
	let endpoint = eval(endpointName);
	endpoint = process.env.NEXT_PUBLIC_BASE_URL + endpoint
	return endpoint;
}


const apiCaller = async(endpoint, payload) => {

	let headers = { 'Content-Type': 'application/json; charset=UTF-8' };

	const apiUrl = createAPIUrl(endpoint);
	console.log('apiUrl ', apiUrl)

	let body = {};

	if(payload) {
		body = payload;
	}

	try{
		const response = await fetch(apiUrl, {
			headers: headers,
			method: 'POST',
			body: JSON.stringify(body)
		})	

		if(response.status == 200) {
			const data = await response.json();
			return data;
		}
	}catch(err) {
		console.log('error in apiCaller ', err);
	}
}

export default apiCaller;