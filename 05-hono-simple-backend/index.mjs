import { Hono } from "hono";
import { serve } from "@hono/node-server";

const PORT = Number(process.env.PORT ?? 3002);

const app = new Hono();

app.get("/echo", (c) => {
  const value = c.req.query("value") ?? "";

  return c.text(value);
});

app.get("/technologies", (c) => {
  const technologies = [
    { id: 1, name: "HTML", category: "frontend" },
    { id: 2, name: "CSS", category: "frontend" },
    { id: 3, name: "JavaScript", category: "frontend" },
    { id: 4, name: "TypeScript", category: "frontend" },
    { id: 5, name: "React", category: "frontend" },
    { id: 6, name: "Node.js", category: "backend" },
    { id: 7, name: "PostgreSQL", category: "backend" },
    { id: 8, name: "Docker", category: "devops" },
    { id: 9, name: "Git", category: "tools" },
  ];

  const json = c.json(technologies)
  return json;
});

app.get("/schedule", (c) => {
  const schedule = [
    { id: 1, date: "2026-11-01", topic: "HTML & CSS basics" },
    { id: 2, date: "2026-11-05", topic: "JavaScript fundamentals" },
    { id: 3, date: "2026-11-09", topic: "TypeScript" },
    { id: 4, date: "2026-11-12", topic: "React components" },
    { id: 5, date: "2026-11-16", topic: "Node.js http module" },
    { id: 6, date: "2026-11-19", topic: "PostgreSQL queries" },
    { id: 7, date: "2026-11-23", topic: "Docker containers" },
    { id: 8, date: "2026-11-26", topic: "Git workflow" },
  ];

  const from = c.req.query("from");
  const to = c.req.query("to");
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if ((from && !datePattern.test(from)) || (to && !datePattern.test(to))) {
    return c.json({ error: "from and to must be in YYYY-MM-DD format" }, 400);
  }

  const filtered = schedule.filter((item) => (!from || item.date >= from) && (!to || item.date <= to));

  return c.json(filtered);
});

app.notFound((c) => c.json({ message: "Not Found ☕️", code: "404" }, 404));

serve({ fetch: app.fetch, port: PORT }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});