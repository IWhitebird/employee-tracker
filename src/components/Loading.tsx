const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-500 border-solid"></div>
      <h1 className="text-4xl font-bold text-center ml-4">Loading...</h1>
    </div>
  );
};

export default Loading;
