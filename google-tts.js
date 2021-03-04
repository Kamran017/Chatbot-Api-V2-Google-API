// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
const path = require("path");

// Import other required libraries
const fs = require('fs');
const util = require('util');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
async function convert(inputText, langCode) {
  // Construct the request
  nm=langCode+'-Wavenet-A'
  const request = {
    input: {text: inputText},
    // Select the language and SSML voice gender (optional)
    voice: {languageCode: langCode, name: nm	, ssmlGender: 'NEUTRAL'},
    
    // select the type of audio encoding
    audioConfig: {audioEncoding: 'LINEAR16'},//for wav encoding
  };

  // Performs the text-to-speech request
  const responseArr = await client.synthesizeSpeech(request);

  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile("1.mp3" , responseArr.audioContent, 'binary');//write file to the directory
  console.log('Audio content written to file: ');//print the path
}