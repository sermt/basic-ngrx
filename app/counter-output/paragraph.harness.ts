import {
  BaseHarnessFilters,
  ComponentHarness,
  HarnessPredicate,
} from "@angular/cdk/testing";

export class ParagraphHarness extends ComponentHarness {
  static hostSelector = "p";

  static with(options: HarnessFilters): HarnessPredicate<ParagraphHarness> {
    return new HarnessPredicate(ParagraphHarness, options).addOption(
      "text",
      options.text,
      (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text)
    );
  }

  async getText(): Promise<string> {
    return (await this.host()).text();
  }
}

interface HarnessFilters extends BaseHarnessFilters {

  text?: string | RegExp;
}
