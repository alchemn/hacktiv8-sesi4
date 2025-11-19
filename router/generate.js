import { Router } from "express"
import { generateFromAudio, generateFromDocument, generateFromImage, generateText } from "../controller/generate.controller.js"
import multer from 'multer'

const router = Router()
const upload = multer()
router.post('/generate-text',generateText)
router.post('/generate-image',upload.single('image'),generateFromImage)
router.post('/generate-from-document',upload.single('document'),generateFromDocument)
router.post('/generate-from-audio',upload.single('audio'),generateFromAudio)

export default router