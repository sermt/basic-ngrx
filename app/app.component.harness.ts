import { ContentContainerComponentHarness } from "@angular/cdk/testing";
import { ButtonHarness } from "./button.harness";
import { ParagraphHarness } from "./counter-output/paragraph.harness";

export class AppComponentHarness extends ContentContainerComponentHarness {
  static hostSelector = "app-component";

  async clickIncrementButton(): Promise<void> {
    const buttonHarness = await this.getHarness(
      ButtonHarness.with({ text: "Increment" })
    );
    await buttonHarness.click();

    const buttonHarness2 = await this.getHarness(
      ButtonHarness
    );
    await buttonHarness2.click();
  }
  async hasParagraphWithText(text: string): Promise<boolean> {
    const paragraphHarness = await this.getHarness(
      ParagraphHarness
    );
    console.log(await paragraphHarness.getText());
    return this.hasHarness(ParagraphHarness.with({ text }));
  }
}
