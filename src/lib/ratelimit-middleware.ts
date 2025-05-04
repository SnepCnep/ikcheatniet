const rateLimitStore = new Map<string, { count: number; lastRequest: number }>();
const RATE_LIMIT = 2;
const TIME_WINDOW = 60 * 1000 * 60;

function rateLimit(req: NextRequest): boolean {
    const ip = req.headers.get('x-forwarded-for') || req.ip || 'unknown';
    const now = Date.now();
    const record = rateLimitStore.get(ip) || { count: 0, lastRequest: now };

    if (now - record.lastRequest < TIME_WINDOW) {
        record.count += 1;
    } else {
        record.count = 1;
        record.lastRequest = now;
    }

    rateLimitStore.set(ip, record);
    return record.count <= RATE_LIMIT;
}
