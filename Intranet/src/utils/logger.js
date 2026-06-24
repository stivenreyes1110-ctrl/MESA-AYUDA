import { useEffect, useRef } from "react";

// ======================================================
// CONFIGURACIÓN DE LOGGER CENTRALIZADO
// ======================================================

const IS_DEV = import.meta.env.DEV;

const logger = {
  info: (tag, message, data = "") => {
    if (!IS_DEV) return;
    console.log(
      `%c[INFO][%c${tag}%c] ${message}`,
      "color: #2ecc71; font-weight: bold;",
      "color: #1abc9c; font-weight: bold; text-decoration: underline;",
      "color: inherit; font-weight: normal;",
      data
    );
  },

  perf: (tag, message, data = "") => {
    if (!IS_DEV) return;
    console.log(
      `%c[PERF][%c${tag}%c] ⏱️ ${message}`,
      "color: #e67e22; font-weight: bold;",
      "color: #d35400; font-weight: bold;",
      "color: inherit; font-weight: normal;",
      data
    );
  },

  api: (method, url, status, latencyMs, data = "") => {
    if (!IS_DEV) return;
    const colorStatus = status >= 200 && status < 300 ? "#2ecc71" : "#e74c3c";
    console.log(
      `%c[API][%c${method}%c] %c${status}%c | ${url} | ⌛ ${latencyMs.toFixed(1)}ms`,
      "color: #3498db; font-weight: bold;",
      "color: #2980b9; font-weight: bold;",
      "color: inherit; font-weight: normal;",
      `color: ${colorStatus}; font-weight: bold;`,
      "color: inherit; font-weight: normal;",
      data
    );
  },

  error: (tag, message, error = "") => {
    console.error(
      `%c[ERROR][%c${tag}%c] ❌ ${message}`,
      "color: #e74c3c; font-weight: bold;",
      "color: #c0392b; font-weight: bold;",
      "color: inherit; font-weight: normal;",
      error
    );
  }
};

// ======================================================
// HOOK PARA PERFILAR RENDERS Y RE-RENDERS
// ======================================================

export function useRenderProfiler(componentName, propsToWatch = {}) {
  if (!IS_DEV) return;

  const renderCount = useRef(0);
  const lastRenderTime = useRef(performance.now());
  const prevProps = useRef(propsToWatch);

  renderCount.current += 1;
  const now = performance.now();
  const elapsed = now - lastRenderTime.current;
  lastRenderTime.current = now;

  // Detectar qué props cambiaron y causaron el re-render
  const changedProps = {};
  Object.keys(propsToWatch).forEach((key) => {
    if (prevProps.current[key] !== propsToWatch[key]) {
      changedProps[key] = {
        before: prevProps.current[key],
        after: propsToWatch[key]
      };
    }
  });
  prevProps.current = propsToWatch;

  useEffect(() => {
    logger.perf(componentName, "Componente montado por primera vez en el DOM");
    return () => {
      logger.perf(componentName, "Componente desmontado del DOM");
    };
  }, []);

  useEffect(() => {
    if (renderCount.current > 1) {
      const hasChanges = Object.keys(changedProps).length > 0;
      logger.perf(
        componentName,
        `Re-renderizado #${renderCount.current} (tiempo desde el último render: ${elapsed.toFixed(1)}ms)`,
        hasChanges ? { cambiosEnProps: changedProps } : "Re-render provocado por estado interno o cambios en el padre"
      );
    }
  });
}

// ======================================================
// PERFILADOR AUXILIAR DE PETICIONES API (LATENCIA)
// ======================================================

export async function profileFetch(url, options = {}) {
  const start = performance.now();
  const method = options.method || "GET";
  try {
    const response = await fetch(url, options);
    const end = performance.now();
    const latency = end - start;
    logger.api(method, url, response.status, latency);
    return response;
  } catch (err) {
    const end = performance.now();
    const latency = end - start;
    logger.api(method, url, 500, latency);
    logger.error("API_FETCH", `Falla de conexión a ${url}`, err);
    throw err;
  }
}

export default logger;
