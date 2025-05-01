import { GoogleGenerativeAI } from "@google/generative-ai";

export const fetchGeminiResponse = async (prompts: string) => {
    try {
        const apiKey = process.env.GEMINI_KEY;
        if (!apiKey) {
            throw new Error("Gemini key is not defined in env variable");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
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
        }
        const result = await model.generateContent(prompt);
        const resultText = await result.response;
        console.log("this is resultText", resultText);
        const response = resultText.text();
        console.log("this is resultText.text()", response);
        const cleanedJson = response.replace("```json\n", "").replace("\n```", "");
        let parsedData;
        try{
            parsedData = await JSON.parse(cleanedJson);
            return parsedData;
        }catch(error){
            console.error("error parsing the data")
        }
    } catch (error) {
        console.error("Error Generating Questions", error)
    }

}