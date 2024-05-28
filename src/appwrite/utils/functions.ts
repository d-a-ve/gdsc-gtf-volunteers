const FEEDBACK_FUNCTIONS_URL = import.meta.env
  .VITE_APPWRITE_FEEDBACK_FUNCTION_URL;

export type FeedbackApiArgs = {
  type: string;
  message: string;
  email: string;
  username: string;
};

type FeedbackDataType = {
  message?: string;
  error?: string;
};

export async function sendFeedback({
  type,
  message,
  email,
  username,
}: FeedbackApiArgs): Promise<FeedbackDataType> {
  const response = await fetch(FEEDBACK_FUNCTIONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // "Access-Control-Allow-Origin": "*",
      // origin: "http://localhost:5173",
    },
    body: JSON.stringify({ type, message, email, username }),
  });

  return response.json();
}
