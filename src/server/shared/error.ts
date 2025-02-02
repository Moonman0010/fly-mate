export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;

    // Capture stack trace to preserve error debugging info
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 🔹 Function to handle errors and return a structured response.
 */
export const handleError = (error: unknown) => {
  console.error("❌ Error:", error);

  if (error instanceof AppError) {
    return {
      status: error.statusCode,
      body: { error: error.message }
    };
  }

  // Handle unknown errors (default to 500)
  return {
    status: 500,
    body: {
      error: "Internal Server Error",
      ...(process.env.NODE_ENV !== "production" && { details: String(error) }) // Show error details in dev
    }
  };
};
