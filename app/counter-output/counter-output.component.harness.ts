import { ContentContainerComponentHarness } from "@angular/cdk/testing";
import { ParagraphHarness } from "./paragraph.harness";

export class CounterOutputComponentHarness extends ContentContainerComponentHarness {
  static hostSelector = "app-counter-output";

  async hasParagraphWithText(text: string): Promise<boolean> {
    return this.hasHarness(ParagraphHarness.with({ text }));
  }
}
