export function initiateClientId(): string {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    let clientId = localStorage.getItem("clientId");
    if (!clientId) {
      try {
        clientId = crypto.randomUUID();
      } catch {
        clientId = `client-${Date.now()}`;
      }
      localStorage.setItem("clientId", clientId);
    }
    return clientId;
  }
  // Fallback for server-side rendering
  return `client-${Date.now()}`;
}
