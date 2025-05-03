'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, SendHorizonal } from 'lucide-react';
import Navbar from '@/components/Navbar'; 

export default function SmartTravelAssistant() {
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<
    { sender: 'user' | 'bot'; text: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'What does the locals say about it?',
    'Is there any specific danger for kids there?',
    'What should I pack?',
    'What safety equipment should I carry?',
    'Any elderly care should I consider?',
    'What footwear is recommended?',
  ];

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  const handleQuestionClick = async (question: string) => {
    if (isLoading) return;
    
    setMessages((prev) => [...prev, { sender: 'user', text: question }]);
    await generateAndAddResponse(question);
  };
  
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;
  
    const input = userInput;
    setMessages((prev) => [...prev, { sender: 'user', text: input }]);
    setUserInput('');
    
    await generateAndAddResponse(input);
  };
  
  const generateAndAddResponse = async (input: string) => {
    setIsLoading(true);
    try {
      const answer = await generateAnswer(input);
      setMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
    } catch (error) {
      console.error('Error generating response:', error);
      setMessages((prev) => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error while processing your request. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAnswer = async (question: string): Promise<string> => {
    try {
      console.log('Sending request with prompt:', question);
      
      // Make the API request - note the path change for App Router
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question }),
        // Force a unique URL to prevent caching issues
        cache: 'no-store'
      });
      
      console.log('Response status:', response.status);
      
      // Get the response as text first to debug
      const responseText = await response.text();
      console.log('Raw response text:', responseText);
      
      // Return the raw text if it can't be parsed
      if (!responseText || responseText.trim() === '') {
        return 'Empty response from server';
      }
      
      try {
        // Try to parse as JSON
        const data = JSON.parse(responseText);
        return data.text || 'No response text available';
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError);
        // Return the raw text if parsing fails
        return `Could not parse response: ${responseText.substring(0, 100)}...`;
      }
    } catch (err: any) {
      console.error('Network error:', err);
      return `Error: ${err.message || 'Unknown error'}`;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 ">
      <Navbar /> 
      <div className="flex items-center justify-center pt-6">
        <Card className="w-full max-w-3xl h-[calc(100vh-110px)] p-6 rounded-2xl shadow-lg bg-white flex flex-col relative">
          <h1 className="text-2xl font-bold text-center text-purple-500 mb-2">
            Smart Travel Assistant
          </h1>

          {/* Suggested Questions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleQuestionClick(question)}
                className="justify-start text-left"
                disabled={isLoading}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {question}
              </Button>
            ))}
          </div>

          {/* Chat Display */}
          <div
            ref={chatRef}
            className="overflow-y-auto flex-1 px-4 py-2 rounded-xl border border-blue-100 bg-white mb-3"
          >
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                Ask me anything about your travel plans!
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-2 max-w-[80%] px-4 py-2 rounded-lg text-sm ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-blue-500 text-white'
                      : 'bg-purple-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              ))
            )}
            {isLoading && (
              <div className="bg-purple-100 text-gray-800 mb-2 max-w-[80%] px-4 py-2 rounded-lg text-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleUserSubmit}
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-full bg-white"
          >
            <input
              type="text"
              placeholder="Ask about your travel..."
              className="flex-1 px-2 py-1 focus:outline-none text-sm"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`${
                isLoading ? 'bg-gray-400' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              } text-white p-2 rounded-full cursor-pointer`}
              disabled={isLoading}
            >
              <SendHorizonal className="w-4 h-4" />
            </button>
          </form>
        </Card>
      </div>
    </main>
  );
}