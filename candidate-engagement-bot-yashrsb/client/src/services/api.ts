export const fetchBotResponse = async (message: string): Promise<string> => {
    const response = await fetch("http://localhost:3001/job-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  
    const data = await response.json();
    return data.reply;
  };
  