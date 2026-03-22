import booksData from "@/data/books.json";
import aboutData from "@/data/about.json";
import type { Book, AboutData } from "@/lib/types";
import { fetchBooksFromSheet, fetchAboutFromSheet } from "@/lib/google-sheets";

/**
 * Data layer: fetches from Google Sheets first, falls back to local JSON.
 * This means the site works even without a Google Sheet configured.
 */

export async function getBooks(): Promise<Book[]> {
  const sheetBooks = await fetchBooksFromSheet();
  if (sheetBooks.length > 0) return sheetBooks;
  return booksData as Book[];
}

export async function getBookById(id: string): Promise<Book | undefined> {
  const books = await getBooks();
  return books.find((book) => book.id === id);
}

export async function getAboutData(): Promise<AboutData> {
  const sheetAbout = await fetchAboutFromSheet();
  if (sheetAbout) return sheetAbout;
  return aboutData as AboutData;
}
