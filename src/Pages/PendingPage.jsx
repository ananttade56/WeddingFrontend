const PendingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-3xl font-bold text-yellow-600">
          Request Pending
        </h1>

        <p className="mt-4 text-gray-600">
          Admin has not approved your request yet.
        </p>
      </div>
    </div>
  );
};

export default PendingPage;