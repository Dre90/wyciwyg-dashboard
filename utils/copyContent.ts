export default function (url: string) {
  try {
    navigator.clipboard.writeText(url);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
