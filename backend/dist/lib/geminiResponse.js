"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGeminiResponse = void 0;
const generative_ai_1 = require("@google/generative-ai");
const fetchGeminiResponse = (prompts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apiKey = process.env.GEMINI_KEY;
        if (!apiKey) {
            throw new Error("Gemini key is not defined in env variable");
        }
        const genAI = new generative_ai_1.GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash", generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1500
            }
        });
        const prompt = {
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            text: prompts
                        }
                    ]
                }
            ]
        };
        const result = yield model.generateContent(prompt);
        const resultText = yield result.response;
        console.log("this is resultText", resultText);
        const response = resultText.text();
        console.log("this is resultText.text()", response);
        const cleanedJson = response.replace("```json\n", "").replace("\n```", "");
        let parsedData;
        try {
            parsedData = yield JSON.parse(cleanedJson);
            return parsedData;
        }
        catch (error) {
            console.error("error parsing the data");
        }
    }
    catch (error) {
        console.error("Error Generating Questions", error);
    }
});
exports.fetchGeminiResponse = fetchGeminiResponse;
