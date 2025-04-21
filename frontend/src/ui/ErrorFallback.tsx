function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <div className='h-screen bg-cGrey-50 flex items-center justify-center p-10'>
        <div className='bg-cGrey-100 border border-cGrey-200 rounded-sm p-10 text-center'>
          <h1 className='mb-5'>Something went wrong 😟</h1>
          <p className='mb-10 text-cGrey-400'>{error.message}</p>
          <button onClick={resetErrorBoundary}>Try again</button>
        </div>
      </div>
    </>
  );
}

export default ErrorFallback;
