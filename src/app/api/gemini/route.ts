import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { userInput } = await req.json();

    if (!userInput || typeof userInput !== "string") {
      return NextResponse.json(
        { error: "userInput is required and must be a string" },
        { status: 400 },
      );
    }

    const systemPrompt = `You are a helpful Smart Travel Assistant bot designed to help users with travel safety tips, packing guidance, and destination-specific advice. Do not use markdown, asterisks (*), emojis, or other symbols in your response. Keep the answers natural and simple. Respond in plain text. 
    Give practical, concise, and friendly responses.`;
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const finalPrompt = `${systemPrompt}\n\nUser: ${userInput}`;
    const result = await model.generateContent(finalPrompt);
    
    const response = await result.response;
    const generatedText =
      (await response.text()) || "I couldn't generate content.";

    return NextResponse.json({ generatedText });
  } catch (error) {
    console.error("error generating content:", error);
    return NextResponse.json(
      { error: "error generating content" },
      { status: 500 },
    );
  }
}