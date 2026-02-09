type LogLevel = 'INFO' | 'WARN' | 'ERROR';

function formatTimestamp(): string {
    return new Date().toISOString();
}

function log(level: LogLevel, message: string, details?: Record<string, unknown>): void {
    const timestamp = formatTimestamp();
    const detailsStr = details ? ` | ${JSON.stringify(details)}` : '';
    console.log(`[${timestamp}] ${level}: ${message}${detailsStr}`);
}

export const logger = {
    info: (message: string, details?: Record<string, unknown>) => log('INFO', message, details),
    warn: (message: string, details?: Record<string, unknown>) => log('WARN', message, details),
    error: (message: string, details?: Record<string, unknown>) => log('ERROR', message, details),
};
