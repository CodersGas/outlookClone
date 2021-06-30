import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const inboxMails   = require('../utils/inbox.json');
const inboxSpam    = require('../utils/spam.json');
const inboxDeleted = require('../utils/deleted.json');  

async function getInboxMails(req, res) {
	let response = {};

	response['status'] = 1;
	response['message'] = 'Inbox data fetched successfully';
	response['finalData'] = inboxMails;

	res.status(200).json(response);
}

async function getUnreadCounts(req, res) {

  	let inboxUnread = 0;
  	let spamUnread  = 0;
  	let response    = {};

  	inboxMails.map((item) => {
  		if(item.unread) {
  			inboxUnread += 1;
  		}
  	});

  	inboxSpam.map((item) => {
  		if(item.unread) {
  			spamUnread += 1;
  		}
  	});

  	response['status'] = 1;
    response['message'] = 'Unread Counts fetched successfully';
    response['unreadCounts'] = { 'inbox': inboxUnread, 'spam': spamUnread };

    res.status(200).json(response);
}

async function getSpamMails(req, res) {
	let response = {};

	response['status'] = 1;
    response['message'] = 'Spam Mails data fetched successfully';
    response['finalData'] = inboxSpam;

    res.status(200).json(response);
}

async function getDeletedMails(req, res) {
	let response = {};

	response['status'] = 1;
    response['message'] = 'Deleted Mails fetched successfully';
    response['finalData'] = inboxDeleted;

    res.status(200).json(response);
}

async function getSpamDetail(req, res) {
	let response = {};
	let mailId = req.body.mailId;


	let mailDetail = null;

	for(let index in inboxSpam) {
	  if(inboxSpam[index].mId === mailId) {
	    mailDetail = inboxSpam[index];
	  }
	}

	response['status'] = 1;
	response['message'] = 'SUCCESS';
	response['finalData'] = mailDetail;
	res.status(200).json(response);
}

async function getInboxMailDetail(req, res) {
	let response   = {};
	let mailDetail = null;
	let mailId     = req.body.mailId;
    
    for(let index in inboxMails) {
      if(inboxMails[index].mId === mailId) {
        mailDetail = inboxMails[index];
      }
    }

    response['status'] = 1;
    response['message'] = 'SUCCESS';
    response['finalData'] = mailDetail;
    res.status(200).json(response);
}

export default {  
	getInboxMails,
	getUnreadCounts,
	getSpamMails,
	getDeletedMails,
	getSpamDetail,
	getInboxMailDetail
}