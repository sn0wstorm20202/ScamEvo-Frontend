export type BackendResponse = {
  ok: boolean;
  status: number;
  requestId: string | null;
  headers: Record<string, string>;
  data: unknown;
  rawText?: string;
};

function safeJsonParse(text: string): { ok: true; value: unknown } | { ok: false } {
  try {
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false };
  }
}

export function normalizeBaseUrl(url: string): string {
  const trimmed = (url || "").trim();
  if (!trimmed) return "http://127.0.0.1:8000";
  return trimmed.replace(/\/+$/, "");
}

export async function backendFetch(
  baseUrl: string,
  path: string,
  init: {
    method?: string;
    headers?: Record<string, string>;
    body?: unknown;
    formData?: FormData;
    requestId?: string;
  } = {}
): Promise<BackendResponse> {
  const url = normalizeBaseUrl(baseUrl) + path;

  const headers: Record<string, string> = {
    ...(init.headers || {}),
  };

  if (init.requestId) {
    headers["X-Request-ID"] = init.requestId;
  }

  let body: BodyInit | undefined = undefined;

  if (init.formData) {
    body = init.formData;
  } else if (init.body !== undefined) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
    body = JSON.stringify(init.body);
  }

  const res = await fetch(url, {
    method: init.method || "GET",
    headers,
    body,
  });

  const resHeaders: Record<string, string> = {};
  res.headers.forEach((v, k) => {
    resHeaders[k.toLowerCase()] = v;
  });

  const text = await res.text();
  const parsed = safeJsonParse(text);

  return {
    ok: res.ok,
    status: res.status,
    requestId: resHeaders["x-request-id"] || null,
    headers: resHeaders,
    data: parsed.ok ? parsed.value : null,
    rawText: parsed.ok ? undefined : text,
  };
}
