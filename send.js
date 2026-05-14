export default async function handler(req, res) {
  const team = req.query.team || 'others';
  const webhookUrl = process.env[`WEBHOOK_${team.toUpperCase()}`];

  if (!webhookUrl) {
    return res.status(400).json({ error: 'Webhook not found' });
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req.body)
  });

  res.status(200).send('OK');
}