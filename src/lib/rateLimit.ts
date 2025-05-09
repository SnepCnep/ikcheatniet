const requestLimits = new Map<string, { count: number; lastRequestTime: number}>();

const REQUEST_LIMIT = 3;
const TIME_FRAME = 10 * 60 * 1000 // 10 minuten in ms

export function checkRateLimit(ip: string): { allowed: boolean, error?: string} {
    const currentTime = Date.now();
    const entry = requestLimits.get(ip);

    if (entry) {
        const timeDiff = currentTime - entry.lastRequestTime;

        if (timeDiff < TIME_FRAME) {
            if (entry.count >= REQUEST_LIMIT) {
                return {
                    allowed: false,
                    error: 'Too many requests, try it again later'
                };
            }
        }  else {
            entry.count = 0
        }
    } else {
        requestLimits.set(ip, {count: 0, lastRequestTime: currentTime})
    }

    let updatedEntry = requestLimits.get(ip);

    if (!updatedEntry) {
        updatedEntry = { count: 0, lastRequestTime: currentTime };
        requestLimits.set(ip, updatedEntry);
    }

    updatedEntry.count++;
    updatedEntry.lastRequestTime = currentTime;

    return { allowed: true }
}