import { cleanup, screen } from "solid-testing-library";

import { renderWithHopeProvider } from "@/utils/renderWithHopeProvider";

import { TextOptions } from "../Text/Text";
import { textStyles } from "../Text/Text.styles";
import { Heading } from "./Heading";

describe("Heading", () => {
  afterEach(cleanup);

  it("should render", () => {
    // act
    renderWithHopeProvider(() => <Heading data-testid="heading">Heading</Heading>);
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toBeInTheDocument();
  });

  it("should render <h2> tag by default", () => {
    // act
    renderWithHopeProvider(() => <Heading data-testid="heading">Heading</Heading>);
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toBeInstanceOf(HTMLHeadingElement);
  });

  it("should render tag provided with the as prop", () => {
    // act
    renderWithHopeProvider(() => (
      <Heading data-testid="heading" as="span">
        Heading
      </Heading>
    ));
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toBeInstanceOf(HTMLSpanElement);
  });

  it("should render children", () => {
    // arrange
    const children = "Heading";

    // act
    renderWithHopeProvider(() => <Heading data-testid="heading">{children}</Heading>);
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toHaveTextContent(children);
  });

  it("should have semantic hope class", () => {
    // act
    renderWithHopeProvider(() => <Heading data-testid="heading">Heading</Heading>);
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toHaveClass("hope-heading");
  });

  it("should return semantic hope class as css selector when calling toString()", () => {
    expect(Heading.toString()).toBe(".hope-heading");
  });

  it("should have class from class prop", () => {
    // arrange
    const stubClass = "stub";

    // act
    renderWithHopeProvider(() => (
      <Heading data-testid="heading" class={stubClass}>
        Heading
      </Heading>
    ));
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toHaveClass(stubClass);
  });

  it("should have class from className prop", () => {
    // arrange
    const stubClass = "stub";

    // act
    renderWithHopeProvider(() => (
      <Heading data-testid="heading" className={stubClass}>
        Heading
      </Heading>
    ));
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toHaveClass(stubClass);
  });

  it("should have class from classList prop", () => {
    // arrange
    const stubClass = "stub";

    // act
    renderWithHopeProvider(() => (
      <Heading data-testid="heading" classList={{ [stubClass]: true }}>
        Heading
      </Heading>
    ));
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toHaveClass(stubClass);
  });

  it("should have stitches generated class from textStyles", () => {
    // arrange
    const textClass = textStyles();

    // act
    renderWithHopeProvider(() => <Heading data-testid="heading">Heading</Heading>);
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toHaveClass(textClass.className);
  });

  it("should have stitches generated class from variants prop", () => {
    // arrange
    const props: TextOptions = {
      color: "primary500",
      size: "4xl",
      fontFamily: "serif",
      fontWeight: "light",
      textAlign: "justify",
      lineClamp: 3,
    };

    const textClass = textStyles({
      ...props,
      fontSize: props.size,
    });

    // act
    renderWithHopeProvider(() => (
      <Heading data-testid="heading" {...props}>
        Heading
      </Heading>
    ));
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toHaveClass(textClass.className);
  });

  it("should have stitches generated class from css prop", () => {
    // arrange
    const customCSS = { bg: "red" };
    const textClass = textStyles({ css: customCSS });

    // act
    renderWithHopeProvider(() => (
      <Heading data-testid="heading" css={customCSS}>
        Heading
      </Heading>
    ));
    const heading = screen.getByTestId("heading");

    // assert
    expect(heading).toHaveClass(textClass.className);
  });
});
