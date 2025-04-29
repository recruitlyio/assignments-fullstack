import useCreateThread from "./hooks/useCreateThread";
import Chat from "./components/chat/Chat";

function App() {
  const { data: thread, isLoading, error } = useCreateThread();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-20">
      <h1 className="text-center text-3xl font-bold mb-4">
        Candidate Engagement Chatbot
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Engage with candidates about the role while building their profile.
      </p>
      <Chat
        thread_id={thread.thread_id}
        message={thread.message}
        message_id={thread.message_id}
      />
    </div>
  );
}

export default App;
