import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';
import { extract } from '@extractus/article-extractor'

dotenv.config();

const router = express.Router();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from Summarizer ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response =await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt+"\n\nTl;dr",
        temperature: 0.7,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 1,
      });

    
    res.status(200).json({ data:response.data.choices });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

router.route('/article').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const data = await extract(prompt,{descriptionLengthThreshold: 120,
        contentLengthThreshold: 500})
    
    const article = data.content.replace(/<[^>]+>/g, '')
    const response =await openai.createCompletion({
        model: "text-davinci-003",
        prompt: article+"\n\nTl;dr",
        temperature: 0.7,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 1,
      });

    
    res.status(200).json({ data:response.data.choices });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;