export class Gift {
  constructor(data) {
    this.id = data.id;
    this.name = data.name || '';
    this.description = data.description || '';
    this.category = data.category || '';
    this.superpowers = data.superpowers || {};
    this.imagePath = this.generateImagePath();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  generateImagePath() {
    return `../../../public/images/${this.category.toLowerCase().replace(' ', '_')}.png`;
  }

  static fromJSON(data) {
    return new Gift(data);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      superpowers: this.superpowers,
      imagePath: this.imagePath,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  update(data) {
    if (data.name !== undefined) this.name = data.name;
    if (data.description !== undefined) this.description = data.description;
    if (data.category !== undefined) this.category = data.category;
    if (data.superpowers !== undefined) this.superpowers = data.superpowers;
    this.imagePath = this.generateImagePath();
    this.updatedAt = new Date();
  }

  getSuperpowerRating(category) {
    return this.superpowers[category] || '+0';
  }

  hasSuperpower(category) {
    return Object.prototype.hasOwnProperty.call(this.superpowers, category);
  }

  getSuperpowerSum() {
    const ratings = Object.values(this.superpowers);
    return ratings.reduce(
      (sum, rating) => sum + parseInt(rating.replace('+', '')),
      0,
    );
  }

  isValid() {
    return (
      this.name.trim() !== '' &&
      this.description.trim() !== '' &&
      this.category.trim() !== '' &&
      Object.keys(this.superpowers).length > 0
    );
  }
}
