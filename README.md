# whatsherup
Whats Her Up? WhatsApp bot API


# Whatsherup

This is a simple package for build an whatsapp appi in second.

## Installation

NPM

```yaml
npm i whatsherup --save
```

BUN

```yaml
bun add whatsherup
```

PNPM

```yaml
pnpm add whatsherup
```

yarn

```yaml
yarn add whatsherup
```

## Usage

This package is a simplified version of the package *@wppconnect-team/wppconnect*

The usage is so simply

1. Import whatsherup
2. create an instance 
3. Select your conecction method 
4. Done, you have your whatsapp client

```tsx
// Importing the package
import { WhatsHerUp } from 'whatsherup'

// Creating an instance
const whatsHerUp = new WhatsHerUp('session-name')

// Select your coneccion method 
// Use connectByQR or connectByPIN 
// connectByQR
whatsHerUp.connectByQR().then((asciiQRCode)=>{
	// Print the code on the console or send it to your front
	console.log(asciiQRCode)
});

// You can use an callback or an promise for get the client 

//Using the callback 
whatsHerUp.setOnready = (client)=>{
	// Send your message 
	/*example my callSing is +57 and my number is 3222222222, 
	* then i use 573222222222@c.us
	*/
	client.sendText('your_number@c.us', 'message')
}

//Using the promise
// In your async function, example "main"
const main = async()=>{

	const client = whatsHerUp.waitUntilReady()
	// Send your message 
	/*example my callSing is +57 and my number is 3222222222, 
	* then i use 573222222222@c.us
	*/
	client.sendText('your_number@c.us', 'message')
	
	// Reciving message
	client.onMessage((messageData)=>{
		//The message 
		console.log(messageData.content) // The text message
		console.log(messageData.sender.from) // The sender's id 
		console.log(messageData.sender.name) // The sender name
	})
}

```

You can send and recive image, video, gif, etc. For more details visit *@wppconnect-team/wppconnect’s documentation in this [link](https://wppconnect.io/docs/tutorial/basics/creating-client/)*