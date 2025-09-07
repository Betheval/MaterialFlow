"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chatbot = void 0;
class Chatbot {
    async sendMessageToLlama(message) {
        try {
            const response = await fetch("http://localhost:11434/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "llama3.1:latest",
                    stream: false,
                    messages: [
                        {
                            role: "user",
                            content: message,
                        },
                    ],
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.message.content || "No response from Llama";
        }
        catch (error) {
            throw new Error(`Error communicating with Llama: ${error.message}`);
        }
    }
}
exports.Chatbot = Chatbot;
