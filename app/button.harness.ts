import {
  BaseHarnessFilters,
  ComponentHarness,
  HarnessPredicate,
} from "@angular/cdk/testing";

export class ButtonHarness extends ComponentHarness {
  static hostSelector = "button";

  static with(options: HarnessFilters): HarnessPredicate<ButtonHarness> {
    return new HarnessPredicate(ButtonHarness, options).addOption(
      "text",
      options.text,
      (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text)
    );
  }

  async getText(): Promise<string> {
    return (await this.host()).text();
  }

  async click(): Promise<void> {
    (await this.host()).click();
  }
}

interface HarnessFilters extends BaseHarnessFilters {
  text?: string | RegExp;
}
