export async function registerMember(payload) {
    const res = await fetch('http://localhost:5174/members', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ ...payload, createdAt: new Date().toISOString() })
    });
    if (!res.ok) {
        const text = await res.text().catch(()=> '');
        throw new Error(`Error API (${res.status}): ${text || 'falló el registro'}`);
    }
    return res.json();
}
