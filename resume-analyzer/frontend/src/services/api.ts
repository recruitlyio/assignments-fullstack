import { ParsedResume } from "@/types";

export async function parseResume(text: string): Promise<{ data?: ParsedResume; error?: string }> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/parse`, {
    cache: 'no-store',
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return { error: errorData.error || "Failed to parse resume" };
  }

  const data = await response.json();
  return { data: data as ParsedResume };
}