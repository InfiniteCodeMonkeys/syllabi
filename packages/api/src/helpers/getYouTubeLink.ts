export default async function getYouTubeLink({
  title,
  creator,
}: {
  title: string;
  creator: string;
}) {
  const results = await fetch(
    "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
      encodeURIComponent(title + " " + creator),
  );

  const json = await results.json();

  return json;
}
