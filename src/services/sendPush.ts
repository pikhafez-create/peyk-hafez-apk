export async function sendPush(token: string, title: string, body: string) {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: token,
      title,
      body,
    }),
  });
}
