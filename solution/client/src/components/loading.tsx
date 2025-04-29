export const Loading = () => {
  return (
    <div id="spinner-container" className="space-y-10">
      <div className="flex justify-center py-48">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};
