export default async function handler(req, res) {
    const { team, msgId, wait } = req.query;
    const webhookUrl = process.env[`WEBHOOK_${(team || 'others').toUpperCase()}`];

    if (!webhookUrl) return res.status(400).json({ error: 'Webhook secret not found' });

    let discordUrl = webhookUrl;
    if (msgId) discordUrl += `/messages/${msgId}`;
    if (wait) discordUrl += "?wait=true";

    try {
        const response = await fetch(discordUrl, {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.text();
        res.status(response.status).send(data);
    } catch (e) {
        res.status(500).send(e.message);
    }
}
