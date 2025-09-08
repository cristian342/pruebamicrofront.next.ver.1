import 'dayjs';
import { ConfigType } from 'dayjs';

declare module 'dayjs' {
  interface Dayjs {
    tz(timezone?: string, keepLocalTime?: boolean): Dayjs;
  }

  namespace dayjs {
    interface DayjsTimezone {
      (date: ConfigType, timezone?: string): Dayjs;
      (date: ConfigType, format: string, timezone?: string): Dayjs;
      guess(): string;
      setDefault(timezone?: string): void;
    }
    const tz: DayjsTimezone;
  }
}
