/**
 * Fetch data from a public Google Sheet using the gviz JSON endpoint.
 * No API key required — the sheet just needs to be shared as "Anyone with the link".
 *
 * Sheet tabs:
 *   "books"     — id | title | coverImage | summary | genre | publishYear | videoUrl
 *   "authors"   — bookId | name | portrait | bio
 *   "students"  — bookId | name | class | school | greeting
 *   "reviews"   — bookId | title | precontent | content
 *   "resources" — bookId | label | url | type
 *   "diary"     — bookId | url | caption
 *   "about"     — key | value
 *   "team"      — name | role | avatar | className | school | hobbies | achievements
 *   "about_images" — url | caption
 */

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "";

interface GvizCell {
  v: string | number | null;
  f?: string;
}

interface GvizResponse {
  table: {
    cols: { id: string; label: string; type: string }[];
    rows: { c: (GvizCell | null)[] }[];
  };
}

type Row = Record<string, string>;

async function fetchSheet(sheetName: string): Promise<Row[]> {
  if (!SHEET_ID) return [];

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  const text = await res.text();

  const jsonStr = text.replace(/^[^(]*\(/, "").replace(/\);?\s*$/, "");
  const data: GvizResponse = JSON.parse(jsonStr);

  const { cols, rows } = data.table;
  const hasLabels = cols.some((col) => col.label !== "");

  // If Google Sheets didn't detect headers, use the first row as headers
  let headers: string[];
  let dataRows: typeof rows;

  if (hasLabels) {
    headers = cols.map((col) => col.label || col.id);
    dataRows = rows;
  } else {
    headers = rows[0]?.c.map((cell) => (cell?.v != null ? String(cell.v) : "")) ?? [];
    dataRows = rows.slice(1);
  }

  return dataRows.map((row) => {
    const obj: Row = {};
    row.c.forEach((cell, i) => {
      if (headers[i]) {
        obj[headers[i]] = cell?.v != null ? String(cell.v) : "";
      }
    });
    return obj;
  });
}

/** Helper: group rows by a key column into a map */
function groupBy(rows: Row[], key: string): Map<string, Row[]> {
  const map = new Map<string, Row[]>();
  for (const row of rows) {
    const k = row[key];
    if (!k) continue;
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(row);
  }
  return map;
}

import type { Book, AboutData, Resource } from "@/lib/types";

export async function fetchBooksFromSheet(): Promise<Book[]> {
  const [bookRows, authorRows, studentRows, reviewRows, resourceRows, diaryRows] =
    await Promise.all([
      fetchSheet("books"),
      fetchSheet("authors"),
      fetchSheet("students"),
      fetchSheet("reviews"),
      fetchSheet("resources"),
      fetchSheet("diary"),
    ]);

  if (bookRows.length === 0) return [];

  const authors = new Map(authorRows.map((r) => [r.bookId, r]));
  const students = new Map(studentRows.map((r) => [r.bookId, r]));
  const reviews = new Map(reviewRows.map((r) => [r.bookId, r]));
  const resources = groupBy(resourceRows, "bookId");
  const diaries = groupBy(diaryRows, "bookId");

  return bookRows
    .filter((row) => row.id)
    .map((row) => {
      const author = authors.get(row.id);
      const student = students.get(row.id);
      const review = reviews.get(row.id);
      const res = resources.get(row.id) ?? [];
      const diary = diaries.get(row.id) ?? [];

      return {
        id: row.id,
        title: row.title || "",
        coverImage: row.coverImage || "",
        summary: row.summary || "",
        genre: row.genre || "",
        publishYear: Number(row.publishYear) || 0,
        videoUrl: row.videoUrl || "",
        author: {
          name: author?.name || "",
          portrait: author?.portrait || "",
          bio: author?.bio || "",
        },
        student: {
          name: student?.name || "",
          className: student?.class || "",
          school: student?.school || "",
          greeting: student?.greeting || "",
        },
        review: {
          title: review?.title || "",
          precontent: review?.precontent || "",
          content: review?.content || "",
        },
        diary: diary.map((d) => ({
          url: d.url || "",
          caption: d.caption || "",
        })),
        resources: res.map((r) => ({
          label: r.label || "",
          url: r.url || "",
          type: (r.type || "other") as Resource["type"],
        })),
      };
    });
}

export async function fetchAboutFromSheet(): Promise<AboutData | null> {
  const [aboutRows, teamRows, imageRows] = await Promise.all([
    fetchSheet("about"),
    fetchSheet("team"),
    fetchSheet("about_images"),
  ]);

  if (aboutRows.length === 0 && teamRows.length === 0) return null;

  const settings: Record<string, string> = {};
  aboutRows.forEach((row) => {
    if (row.key) settings[row.key] = row.value || "";
  });

  return {
    title: settings.title || "Về Chúng Tôi",
    description: settings.description || "",
    mission: settings.mission || "",
    team: teamRows
      .filter((row) => row.name)
      .map((row) => ({
        name: row.name,
        role: row.role || "",
        avatar: row.avatar || "",
        className: row.className || "",
        school: row.school || "",
        hobbies: row.hobbies || "",
        achievements: row.achievements || "",
      })),
    images: imageRows
      .filter((row) => row.url)
      .map((row) => ({
        url: row.url,
        caption: row.caption || "",
      })),
  };
}
