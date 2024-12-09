import axios from 'axios';
import {apiKey} from '../constants/constant';

const client = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
});

const chatGptEndPoint = 'https://api.openai.com/v1/chat/completions';
const DalleEndPoint = 'https://api.openai.com/v1/images/generations';

export const apiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGptEndPoint, {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `Does this message want to generate an Ai picture, image , art or anything similar ? ${prompt} . Simplay answer with yes or no`,
        },
      ],
    });
    // console.log('data: ', res.data.choices[0].message);
    let isArt = res.data?.choices[0]?.message?.content;
    if (isArt.toLowerCase().includes('yes')) {
      console.log('dalle api call');
      return dalleApiCall(prompt, messages || []);
    } else {
      console.log('chatGpt api call');
      return chatGptApiCall(prompt, messages || []);
    }
  } catch (error) {
    console.error('Error response:', error.response?.data || error.message);

    return Promise.resolve({success: false, msg: error.message});
  }
};

const chatGptApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(chatGptEndPoint, {
      model: 'gpt-4o-mini',
      messages,
    });

    let answer = res.data?.choices[0]?.message?.content;
    messages.push({role: 'asisstant', content: answer.trim()});
    return Promise.resolve({success: true, data: messages});
  } catch (error) {
    console.error('Error response:', error.response?.data || error.message);
    return Promise.resolve({success: false, msg: error.message});
  }
};

const dalleApiCall = async (prompt, messages) => {
  try {
    const res = await client.post(DalleEndPoint, {
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '512x512',
    });
    let url = res.data?.data[0]?.url;
    messages.push({role: 'asisstant', content: url});
    return Promise.resolve({success: true, data: messages});
  } catch (error) {
    console.error('Error response:', error.response?.data || error.message);
    return Promise.resolve({success: false, msg: error.message});
  }
};
