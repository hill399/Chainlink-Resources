# Chainlink NodeJS Serverless External Adapter - Telegram Nudge

A basic external adapter to send messages to personal telegram bot. Basic functions include sending of:

	- Messages
	- Image
	- Video
	- Audio
	- Location
	- Documents

Telegram bot setup here: 
	https://core.telegram.org/bots

Once you have bot API key, create .env in root and enter API key:
```bash
API=YOUR_API_KEY
```


Start chat with bot ('Hi!') and identify chat ID from: 
	https://api.telegram.org/bot"YOURBOTTOKENHERE"/getUpdates


Based upon CL-EA-NodeJS-Template here:
	https://github.com/thodges-gh/CL-EA-NodeJS-Template




## Usage

Requests are based upon Telegram API here:
	https://core.telegram.org/bots/api

Messages
```bash
endpoint: sendMessage,
chat_id: 'YOUR_CHAT_ID',
text_input: "Your Message"
```

Image
```bash
endpoint: sendVideo,
chat_id: 'YOUR_CHAT_ID',
text_input: "Image_URL or FILE_ID"
```

Audio
```bash
endpoint: sendAudio,
chat_id: 'YOUR_CHAT_ID',
text_input: "Audio_URL or FILE_ID"
```

Document
```bash
endpoint: sendDocument,
chat_id: 'YOUR_CHAT_ID',
text_input: "DOC_URL or FILE_ID"
```

Location
```bash
endpoint: sendLocation,
chat_id: 'YOUR_CHAT_ID',
longitude: 'YOUR_LONGITUDE_POS',
latitude: "YOUR_LATITUDE_POS"
```

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Create the zip

```bash
zip -r cl-ea-tgn.zip .
```

## Install to AWS Lambda

- In Lambda Functions, create function
- On the Create function page:
  - Give the function a name
  - Use Node.js 8.10 for the runtime
  - Choose an existing role or create a new one
  - Click Create Function
- Under Function code, select "Upload a .zip file" from the Code entry type drop-down
- Click Upload and select the `cl-ea-tgn.zip` file
- Handler should remain index.handler
- Add the environment variable:
  - Key: API_KEY
  - Value: Your_API_key
- Save


## Install to GCP

- In Functions, create a new function, choose to ZIP upload
- Click Browse and select the `cl-ea-tgn.zip` file
- Select a Storage Bucket to keep the zip in
- Function to execute: gcpservice
- Click More, Add variable
  - NAME: API_KEY
  - VALUE: Your_API_key
  
## Node jobspec (for GCP)
```bash
{
	"initiators": [
		{
			"type": "runlog",
			"params": {
				"address": "0x0000000000000000000000000000000000000000"
			}
		}
	],
	"tasks": [
		{
			"type": "gcpservice",
			"confirmations": 0,
			"params": {}
		}
	],
	"startAt": null,
	"endAt": null
}
```

## Contract Test

Follow Node Operator tutorial at Chainlink docs here: https://docs.chain.link/docs/running-a-chainlink-node
At the 'fulfilling requests' stage, substitute default RopstenConsumer.sol for contract at /test_contract/RopstenConsumerTGN.sol.
