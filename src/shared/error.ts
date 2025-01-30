export class AppError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Maintain the correct stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // 🔹 Function to handle errors and send a structured response
  export const handleError = (error: any) => {
    console.error("❌ Error:", error);
  
    // If the error is an instance of `AppError`, return structured response
    if (error instanceof AppError) {
      return {
        status: error.statusCode,
        body: { error: error.message },
      };
    }
  
    // Handle unknown errors
    return {
      status: 500,
      body: { error: "Internal Server Error" },
    };
  };