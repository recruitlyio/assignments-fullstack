export const styles = {
  listeningIndicatorContainer: "flex items-center justify-center space-x-2 mt-4",
  listeningIndicatorBarBase: "w-2 h-6 rounded bg-blue-500 transition-all duration-300",
  listeningIndicatorBarListening: "animate-pulse",

  videoStream: "rounded-lg w-full h-auto shadow-md",

  assessmentUIContainer: "p-6 space-y-6 max-w-3xl mx-auto",
  assessmentUITitle: "text-2xl font-bold text-gray-900",
  questionContainer: "p-4 border rounded shadow-sm bg-white",
  questionTitle: "text-xl font-semibold text-gray-800 mb-3",
  questionText: "text-gray-700",
  mediaContainer: "flex flex-col items-center space-y-4",

  controlsContainer: "my-4 text-center", 
  startButton: "px-5 py-2 text-base cursor-pointer border-none rounded text-white mx-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed", // Green start button
  stopButton: "px-5 py-2 text-base cursor-pointer border-none rounded text-white mx-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed", // Red stop button
  warningText: "text-orange-500 font-bold text-center my-2", 

  transcriptContainer: "mt-4 p-4 border rounded bg-gray-50 min-h-[80px]", 
  transcriptLabel: "text-sm font-medium text-gray-600 mb-1",
  transcriptText: "text-gray-800 whitespace-pre-wrap min-h-[50px] bg-gray-50 border border-gray-300 p-2 rounded", 

  submitButton: "mt-4 px-6 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed", 
  errorText: "p-6 text-red-600",
};

export const getListeningIndicatorDelay = (index: number): string => `delay-${index * 100}`;

