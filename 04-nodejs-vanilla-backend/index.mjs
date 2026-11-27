import http from "node:http";

const PORT = process.env.PORT ?? 3002;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const technologies = [
    { id: 1, name: "JavaScript", description: "Основы языка и асинхронность" },
    { id: 2, name: "Node.js", description: "Создание серверных приложений" },
    { id: 3, name: "HTTP", description: "Методы, маршруты и статус-коды" },
    { id: 4, name: "SQL", description: "Запросы и работа с базами данных" },
    { id: 5, name: "TypeScript", description: "Типизация JavaScript-приложений" },
    { id: 6, name: "React", description: "Создание пользовательских интерфейсов" },
    { id: 7, name: "Git", description: "Контроль версий и совместная работа" },
    { id: 8, name: "Docker", description: "Контейнеризация приложений" },
    { id: 9, name: "PostgreSQL", description: "Реляционные базы данных" },
  ];

  const schedule = [
    { id: 1, date: "2026-11-30", topic: "JavaScript: асинхронность", durationMinutes: 60 },
    { id: 2, date: "2026-12-02", topic: "Node.js: HTTP-сервер", durationMinutes: 90 },
    { id: 3, date: "2026-12-04", topic: "HTTP: маршруты и статус-коды", durationMinutes: 60 },
    { id: 4, date: "2026-12-07", topic: "SQL: основы запросов", durationMinutes: 90 },
    { id: 5, date: "2026-12-09", topic: "TypeScript: типизация", durationMinutes: 60 },
    { id: 6, date: "2026-12-11", topic: "React: компоненты", durationMinutes: 90 },
    { id: 7, date: "2026-12-14", topic: "Git: ветки и слияние", durationMinutes: 60 },
    { id: 8, date: "2026-12-16", topic: "Docker: контейнеры", durationMinutes: 90 },
  ];

  if (req.method === "GET" && url.pathname === "/echo") {
    const value = url.searchParams.get("value") ?? "";

    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(value);
    return;
  }

  if (req.method === "GET" && url.pathname === "/technologies") {
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(technologies));
    return;
  }

  if (req.method === "GET" && url.pathname === "/schedule") {
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const fromDate = from === null ? null : new Date(`${from}T00:00:00.000Z`);
    const toDate = to === null ? null : new Date(`${to}T00:00:00.000Z`);
    const validFrom = from === null || (
      /^\d{4}-\d{2}-\d{2}$/.test(from) &&
      !Number.isNaN(fromDate.getTime()) &&
      fromDate.toISOString().slice(0, 10) === from
    );
    const validTo = to === null || (
      /^\d{4}-\d{2}-\d{2}$/.test(to) &&
      !Number.isNaN(toDate.getTime()) &&
      toDate.toISOString().slice(0, 10) === to
    );

    if (!validFrom || !validTo || (from && to && from > to)) {
      res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ error: "from and to must be valid dates in YYYY-MM-DD format, and from must not be after to" }));
      return;
    }

    const filteredSchedule = schedule.filter(
      (item) => (!from || item.date >= from) && (!to || item.date <= to),
    );

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(filteredSchedule));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify({ error: "Not Found" }));
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

