import WebPartContext from "@microsoft/sp-webpart-base/lib/core/WebPartContext";

export default interface IExampleProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
  context: WebPartContext;
}