export function buildClosePayload({ terminalId, items, total }) {
  return {
    terminalId,
    closedAt: new Date().toISOString(),
    items,
    total,
  }
}