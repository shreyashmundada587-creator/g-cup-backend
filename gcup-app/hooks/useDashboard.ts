import { useEffect, useState } from "react";
import { getJSON } from "../services/api";

export function useDashboard(role: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);
      const res = await getJSON(`/dashboard/${role}`);
      setData(res);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, refresh: loadDashboard };
}