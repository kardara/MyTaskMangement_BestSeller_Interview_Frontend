import { useState, useCallback } from "react";

interface AsyncActionReturn {
  loading: boolean;
  error: string;
  success: string;
  setSuccess: (msg: string) => void;
  run: (action: () => Promise<void>) => Promise<void>;
}

export function useAsyncAction(): AsyncActionReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccessState] = useState("");

  const setSuccess = useCallback((msg: string) => setSuccessState(msg), []);

  const run = useCallback(async (action: () => Promise<void>) => {
    setError("");
    setSuccessState("");
    setLoading(true);
    try {
      await action();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, success, setSuccess, run };
}
