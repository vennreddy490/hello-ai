import { Ai } from '@cloudflare/ai';
import data from './test.json';

// Define interface for mentee and mentor data
interface Person {
  name: string;
  countryOfOrigin: string;
  languages: string[];
  currentRole: string;
  skills: string[];
  industry: string;
  currentLocation: string;
}

// Extract the mentee from the data
const [mentee, ...mentors] = data as Person[];

export interface Env {
  AI: any;
}

export default {
  async fetch(request: Request, env: Env) {
    const ai = new Ai(env.AI);

    const messages = [
      { role: 'system', content: `Your client is named ${mentee.name}. His info is in this JSON object:`, ...mentee },
      { role: 'system', content: `Here are some mentors whose information is found: ${mentors.map(mentor => mentor.name).join(', ')}` },
    //   { role: 'user', content: 'Rank the clients best to worst as a match for the client. Your answer should be in the format of: 1)____, 2)____, 3)____, 4)____. Provide ONLY THE RANKING of names in your answer.' },
      { role: 'user', content: 'Rank which mentors would best match the client.'}
    ];

    const requestData = {
      messages,
    };

    const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', requestData);

	let str = console.log(response.response)

    console.log(JSON.stringify(response));
    return new Response(JSON.stringify(response));
	
  },

  


};