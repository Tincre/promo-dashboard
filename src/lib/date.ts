export function now() {
  const event = new Date();
  return event.toISOString().slice(0, 10); // don't include time
}
