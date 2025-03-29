// Placeholder - used in Node backend or Next.js API route
// OpenAI Whisper requires file/audio stream

export const transcribeAudio = async (audioFile) => {
    const formData = new FormData();
    formData.append("file", audioFile);
    formData.append("model", "whisper-1");
  
    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
      },
      body: formData
    });
  
    const result = await response.json();
    return result.text;
  };
  