// API Rate Limiting Utility để ngăn chặn spam requests

const requestCache = new Map<string, number>();
const REQUEST_COOLDOWN = 1000; // 1 giây cooldown cho mỗi endpoint

export function shouldAllowRequest(endpoint: string): boolean {
  const now = Date.now();
  const lastRequest = requestCache.get(endpoint);
  
  if (lastRequest && (now - lastRequest) < REQUEST_COOLDOWN) {
    console.warn(`🚫 Rate limited: ${endpoint} (cooldown: ${REQUEST_COOLDOWN}ms)`);
    return false;
  }
  
  requestCache.set(endpoint, now);
  return true;
}

export function clearRateLimit(endpoint?: string) {
  if (endpoint) {
    requestCache.delete(endpoint);
  } else {
    requestCache.clear();
  }
} 