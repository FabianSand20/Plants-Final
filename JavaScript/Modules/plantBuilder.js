// plantBuilder.js

export class PlantBuilder {
  constructor() {
    this.name = '';
    this.soil = '';
    this.pot = '';
    this.potMaterial = '';
    this.potStyle = '';
    this.color = '';
    this.extras = [];
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withSoil(soil) {
    this.soil = soil;
    return this;
  }

  withPot(pot) {
    this.pot = pot;
    return this;
  }

  withPotMaterial(potMaterial) {
    this.potMaterial = potMaterial;
    return this;
  }

  withPotStyle(potStyle) {
    this.potStyle = potStyle;
    return this;
  }

  withColor(color) {
    this.color = color;
    return this;
  }

  withExtras(extras) {
    this.extras = extras;
    return this;
  }

  build() {
    return {
      name: this.name,
      soil: this.soil,
      pot: this.pot,
      potMaterial: this.potMaterial,
      potStyle: this.potStyle,
      color: this.color,
      extras: this.extras
    };
  }
}