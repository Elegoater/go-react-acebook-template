import { render, screen } from "@testing-library/react";

import Post from "../../src/components/Post/Post";

describe("Post", () => {
  test("displays the message as an article", () => {
    const testPost = { 
      _id: "123", 
      Question: "test question",
      Answer: "test answer",
      UserID: "1"
    };
    render(<Post post={testPost} />);

    const article = screen.getByRole("article");
    expect(article.textContent).toBe("test question, test answer, by userID 1");
  });
});
