import type { Note } from "@/types/note";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { localNotesRepository } from "./localNotesRepository";
import { notesStorage } from "./notesStorage";

describe("localNotesRepository", () => {
  let inMemoryStorage: Record<string, Note> = {};

  const createTestNote = (title: string): string => {
    const id: string = crypto.randomUUID();
    inMemoryStorage[id] = {
      id,
      title,
      content: {},
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return id;
  };

  beforeEach(() => {
    inMemoryStorage = {};
    vi.useFakeTimers();

    vi.spyOn(notesStorage, "iterate").mockImplementation(async (iteratee) => {
      let iteration = 0;
      for (const key in inMemoryStorage) {
        await iteratee(inMemoryStorage[key], key, iteration++);
      }
    });
    vi.spyOn(notesStorage, "setItem").mockImplementation(async (key, value) => {
      inMemoryStorage[key] = value as Note;
    });
    vi.spyOn(notesStorage, "getItem").mockImplementation(async (key) => {
      return inMemoryStorage[key];
    });
    vi.spyOn(notesStorage, "removeItem").mockImplementation(async (key) => {
      delete inMemoryStorage[key];
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("should get notes", async () => {
    createTestNote("Test note");

    const notes = await localNotesRepository.getNotes();
    expect(notes).toHaveLength(1);
    expect(notes[0].title).toEqual("Test note");
  });

  it("should create note", async () => {
    const note = await localNotesRepository.createNote({
      title: "Test note",
    });
    expect(inMemoryStorage[note.id]).toEqual({
      id: expect.any(String),
      title: "Test note",
      content: expect.anything(),
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });
  });

  it("should get note content", async () => {
    const id = createTestNote("Test note");

    const content = await localNotesRepository.getNoteContent(id);
    expect(content).toBeDefined();
  });

  it("should update note data", async () => {
    const id = createTestNote("Test note");

    const newTitle = "Updated note";
    const newContent = {
      type: "doc",
      content: [],
    };

    await localNotesRepository.updateNote({
      id,
      title: newTitle,
      content: newContent,
    });

    expect(inMemoryStorage[id].title).toEqual(newTitle);
    expect(inMemoryStorage[id].content).toEqual(newContent);
  });

  it("should delete note", async () => {
    const id = createTestNote("Test note");

    await localNotesRepository.deleteNote(id);

    expect(inMemoryStorage[id]).toBeUndefined();
    expect(inMemoryStorage).toEqual({});
  });

  it("should update note's updatedAt field", async () => {
    const id = createTestNote("Test note");

    vi.advanceTimersByTime(1000);

    await localNotesRepository.updateNote({
      id,
      title: "Updated note",
      content: {},
    });

    expect(inMemoryStorage[id].updatedAt).toEqual(Date.now());
  });
});
