export class StepSection {
  name: string;
  steps: string[];

  constructor(section?: StepSection) {
    // Default constructor
    if(section == null) {
      this.name = "";
      this.steps = [""];
    }
    // Copy constructor.
    else {
      this.name = section.name;
      this.steps = section.steps;
    }
  }
}
