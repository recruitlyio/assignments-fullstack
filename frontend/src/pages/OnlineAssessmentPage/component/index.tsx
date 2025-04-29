import React from "react";
import { QuestionData } from '../types';
import { styles, getListeningIndicatorDelay } from './styles'; // Import styles

interface ListeningIndicatorProps {
  listening: boolean;
}

export const ListeningIndicator: React.FC<ListeningIndicatorProps> = ({ listening }) => {
  return (
    <div className={styles.listeningIndicatorContainer}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`${styles.listeningIndicatorBarBase} ${
            listening ? `${styles.listeningIndicatorBarListening} ${getListeningIndicatorDelay(i)}` : ""
          }`}
        />
      ))}
    </div>
  );
};

interface VideoStreamProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}

export const VideoStream: React.FC<VideoStreamProps> = ({ videoRef }) => {
  return <video ref={videoRef} autoPlay muted className={styles.videoStream} />; // Added muted to prevent feedback loop
};

interface AssessmentUIProps {
  questionData: QuestionData | undefined;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  listening: boolean;
  transcript: string;
  handleSubmit: () => Promise<void>;
  handleStartRecording: () => void; // Add start handler prop
  handleStopRecording: () => void;  // Add stop handler prop
  isSpeechRecognitionSupported: boolean; // Add support status prop
}

export const AssessmentUI: React.FC<AssessmentUIProps> = ({
  questionData,
  videoRef,
  listening,
  transcript,
  handleSubmit,
  handleStartRecording,
  handleStopRecording,
  isSpeechRecognitionSupported,
}) => {
  if (!questionData) {
    return <div className={styles.errorText}>Error: Assessment question data not found.</div>;
  }

  return (
    <div className={styles.assessmentUIContainer}>
      <h1 className={styles.assessmentUITitle}>Online Assessment</h1>
      <div className={styles.questionContainer}>
        <h2 className={styles.questionTitle}>Question:</h2>
        <p className={styles.questionText}>{questionData.question}</p>
      </div>

      <div className={styles.mediaContainer}>
        <VideoStream videoRef={videoRef} />
        <ListeningIndicator listening={listening} />
      </div>

      {/* Recording Controls */}
      <div className={styles.controlsContainer}> {/* Add a container for buttons if needed */}
        {!isSpeechRecognitionSupported ? (
          <p className={styles.warningText}>Speech Recognition is not supported in your browser.</p>
        ) : !listening ? (
          <button
            onClick={handleStartRecording}
            className={styles.startButton} // Add styles.startButton
            disabled={listening} // Disable if already listening (redundant check, but safe)
          >
            Start Recording
          </button>
        ) : (
          <button
            onClick={handleStopRecording}
            className={styles.stopButton} // Add styles.stopButton
            disabled={!listening} // Disable if not listening
          >
            Stop Recording
          </button>
        )}
      </div>

      <div className={styles.transcriptContainer}>
        <p className={styles.transcriptLabel}>Your Response (Transcript):</p>
        {/* Display placeholder only if transcript is empty AND not listening */}
        <p className={styles.transcriptText}>
          {transcript || (!listening && "Click 'Start Recording' and begin speaking...")}
          {listening && !transcript && "Listening..."} {/* Show listening if no transcript yet */}
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        // Disable submit if transcript is empty OR if currently listening
        disabled={!transcript.trim() || listening || !isSpeechRecognitionSupported}
        className={styles.submitButton}
        title={listening ? "Stop recording before submitting" : !transcript.trim() ? "Record your response first" : "Submit your response"}
      >
        Submit Response
      </button>
    </div>
  );
};

