import { useQuery } from "@tanstack/react-query";

export default function useCreateThread() {
  return useQuery({
    queryKey: ["createThread"],
    queryFn: async () => {
      const response = await fetch("/api/v1/thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    },
  });
}
