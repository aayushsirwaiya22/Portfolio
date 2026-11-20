import { useEffect, useState } from "react";

const DEFAULT_TIME_ZONE = "Asia/Kolkata";

// A clock that keeps its own time in a chosen time zone. Used for the
// "local time" readouts so the page shows a live, ticking value instead of
// a static string.
export function useLocalTime(timeZone = DEFAULT_TIME_ZONE) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 1000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}

function format(timeZone) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "--:--:--";
  }
}
