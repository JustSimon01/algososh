import { fireEvent, render, screen } from "@testing-library/react";
import { invertArray } from "./string";
import { BrowserRouter } from "react-router-dom";

describe("Тесты алгоритма строки", () => {
  test("Разворот строки с чётным количеством символов", async () => {
    expect(await invertArray("12345678")).toEqual("87654321");
  }, 15000);

  test("Разворот строки с не чётным количеством символов", async () => {
    expect(await invertArray("123456789")).toEqual("987654321");
  }, 15000);

  test("Разворот строки с одним символом", async () => {
    expect(await invertArray("1")).toEqual("1");
  }, 15000);

  test("Разворот пустой строки", async () => {
    expect(await invertArray("")).toEqual("");
  }, 15000);
});
