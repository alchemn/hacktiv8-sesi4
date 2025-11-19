import 'dotenv/config'
import { GoogleGenAI } from '@google/genai'


const ai  = new GoogleGenAI({apiKey: process.env.API_KEY})

const model = 'gemini-2.5-flash-lite';

export async function generateText(req,res) {
    const {prompt} = req.body
    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt
        })
        res.status(200).json({result: response.text})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    
    }
}


export async function generateFromImage(req,res){
    const {prompt} = req.body;
    const base64Image = req.file.buffer.toString('base64');
    try {
        const response = await ai.models.generateContent({
            model,
            contents: [
                {text: prompt, type: "text"},
                {inlineData: {data: base64Image, mimeType: req.file.mimetype}}
            ]
        })
        res.status(200).json({result: response.text})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    }
}


export async function generateFromDocument(req,res){
    const {prompt} = req.body;
    const base64Document = req.file.buffer.toString('base64');
    try {
        const response = await ai.models.generateContent({
            model,
            contents:[
                {text: prompt ?? "tolong buat ringkasan dari dokumen berikut.", type: "text"},
                {inlineData: {data: base64Document, mimeType: req.file.mimetype}}
            ],
        })
        res.status(200).json({result: response.text})
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error.message})
    
    }
}

export async function generateFromAudio(req,res){
    const {prompt} = req.body;
    const base64Audio = req.file.buffer.toString('base64');
try {
    const response = await ai.models.generateContent({
        model,
        contents: [
            {text: prompt ?? "Tolong buatkan transkip dari rekaman berikut.", type: "text"},
            {inlineData: {data:base64Audio, mimeType: req.file.mimetype}}
        ]
        })
        res.status(200).json({result: response.text})
} catch (error) {
    console.log(error)
    res.status(500).json({error: error.message})
}
}