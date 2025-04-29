import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { QuestionData } from '../types';
import { AssessmentUI } from "../component";

// --- SpeechRecognition type definitions remain the same ---
interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

type SpeechRecognitionInstance = EventTarget & {
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event & { error?: string }) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
};


const AssessmentContainer: React.FC = () => {
  const { state } = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true); // Track browser support
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null); // Ref to hold the recognition instance

  const questionData = state?.questionData as QuestionData | undefined;

  // Effect for camera setup
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing camera:", err);
      });

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  // Effect for speech recognition setup
  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("Speech Recognition API is not supported in this browser.");
      setIsSupported(false); // Update state if not supported
      return;
    }

    const recognition = new (SpeechRecognition as any)() as SpeechRecognitionInstance;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setListening(false);
    };

    recognition.onerror = (event: Event & { error?: string }) => {
      console.error("Speech recognition error:", event.error || event);
      // Handle specific errors if needed, e.g., 'not-allowed' or 'service-not-allowed'
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        alert("Microphone access denied. Please allow microphone access in your browser settings.");
      }
      setListening(false);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i] && event.results[i][0] && event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
        // We are only appending final results here, interim results are ignored for the main transcript state
      }
      if (finalTranscript) {
        setTranscript(prev => prev + finalTranscript + ' '); // Add space after final parts
      }
    };

    // Store the instance in the ref
    recognitionRef.current = recognition;
    setIsSupported(true); // Ensure supported state is true if initialization succeeds

    // Cleanup function
    return () => {
      console.log("Cleaning up speech recognition instance.");
      if (recognitionRef.current) {
        recognitionRef.current.stop(); // Ensure it stops on unmount
        // Nullify handlers to prevent potential memory leaks or errors after unmount
        recognitionRef.current.onstart = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current = null; // Clear the ref
      }
    };
  }, []); // Run only once on mount

  // Function to start recording
  const handleStartRecording = () => {
    if (recognitionRef.current && !listening) {
      try {
        console.log("Manually starting speech recognition");
        // Clear previous transcript when starting a new recording session
        setTranscript("");
        recognitionRef.current.start();
      } catch (error: any) {
        console.error("Failed to start speech recognition:", error);
        // Handle specific errors like InvalidStateError if already started
        if (error.name === 'InvalidStateError') {
           console.warn("Recognition might already be active or ending.");
           // Optionally try to stop and restart, or just ignore
        } else {
           alert(`Could not start recording: ${error.message}`);
        }
      }
    } else if (!isSupported) {
       alert("Speech Recognition is not supported in this browser.");
    } else if (!recognitionRef.current) {
       console.error("Speech recognition not initialized yet.");
       alert("Speech recognition is not ready yet. Please wait a moment.");
    }
  };

  // Function to stop recording
  const handleStopRecording = () => {
    if (recognitionRef.current && listening) {
      try {
        console.log("Manually stopping speech recognition");
        recognitionRef.current.stop();
        // setListening(false); // Let the 'onend' event handle this state change
      } catch (error) {
         console.error("Failed to stop speech recognition:", error);
         alert(`Could not stop recording: ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  };

  // Function to handle submission
  const handleSubmit = async () => {
    if (!transcript.trim()) {
        alert("Transcript is empty. Please record your response before submitting.");
        return;
    }
    if (listening) {
        alert("Please stop recording before submitting.");
        return;
    }
    console.log("Submitting transcript:", transcript);
    try {
      const response = await fetch("/review-answer", { // Make sure this API endpoint is correct
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: transcript.trim(), question: questionData }), // Trim transcript
      });

      // Read the response body as text regardless of success/failure first
      const responseBodyText = await response.text();

      if (!response.ok) {
        // Use the response text in the error message if available
        throw new Error(`Submission failed with status: ${response.status}. ${responseBodyText || 'No response body'}`);
      }

      console.log("Submission successful. Response:", responseBodyText);
      // Display the response text from the API in an alert
      alert(`Submission Feedback:\n\n${responseBodyText}`);
      setTranscript(""); // Clear transcript after successful submission

    } catch (err) {
      console.error("Submission failed", err);
      // The error message might already contain the response body if it was an HTTP error
      alert(`Submission failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <AssessmentUI
      questionData={questionData}
      videoRef={videoRef}
      listening={listening}
      transcript={transcript}
      handleSubmit={handleSubmit}
      handleStartRecording={handleStartRecording} // Pass start handler
      handleStopRecording={handleStopRecording}   // Pass stop handler
      isSpeechRecognitionSupported={isSupported} // Pass support status
    />
  );
};

export default AssessmentContainer;
