import { PageContext } from "@microsoft/sp-page-context";

export default interface IHelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  pageContext: PageContext;
}