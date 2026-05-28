const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-3 text-gray-600 font-medium">
        Your request is pending...
      </p>
    </div>
  );
};

export default Loader;