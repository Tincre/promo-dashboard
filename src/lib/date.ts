export function now() {
  const event = new Date();
  console.log(event.toString());
  const date = event.toISOString().slice(0, 10); // don't include time
  console.debug(`Generating date ${date}`);
  return date;
}
