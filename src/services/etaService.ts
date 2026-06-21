export async function getETA(origin: any, destination: any) {
  const API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

  const url =
    `https://maps.googleapis.com/maps/api/directions/json?origin=` +
    `${origin.latitude},${origin.longitude}&destination=` +
    `${destination.latitude},${destination.longitude}` +
    `&key=${API_KEY}`;

  const res = await fetch(url);
  const data = await res.json();

  const route = data.routes?.[0];

  if (!route) return null;

  return {
    durationText: route.legs[0].duration.text,
    durationValue: route.legs[0].duration.value, // seconds
    distanceText: route.legs[0].distance.text,
  };
}
