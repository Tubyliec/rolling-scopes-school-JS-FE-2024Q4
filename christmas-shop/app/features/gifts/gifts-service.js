import { API_ENDPOINTS, GIFT_CATEGORIES } from '../../shared/constants/api.js';
import { UI_CONFIG } from '../../shared/constants/ui-constants.js';
import { Gift } from '../../entities/gift/gift.model.js';

export class GiftsService {
  constructor() {
    this.gifts = [];
    this.isLoading = false;
    this.error = null;
  }

  async loadGifts() {
    try {
      this.isLoading = true;
      this.error = null;

      const response = await fetch(API_ENDPOINTS.GIFTS_DATA);
      const data = await response.json();

      this.gifts = data.map((giftData) => Gift.fromJSON(giftData));
      return this.gifts;
    } catch (error) {
      this.error = error.message;
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async getAllGifts() {
    if (this.gifts.length === 0) {
      await this.loadGifts();
    }
    return this.gifts;
  }

  async getGiftsByCategory(category) {
    const allGifts = await this.getAllGifts();

    if (category === GIFT_CATEGORIES.ALL) {
      return allGifts;
    }

    return allGifts.filter((gift) => gift.category === category);
  }

  async getRandomGifts(count = UI_CONFIG.RANDOM_GIFTS_COUNT) {
    const allGifts = await this.getAllGifts();
    const shuffled = [...allGifts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  async getGiftById(id) {
    const allGifts = await this.getAllGifts();
    return allGifts.find((gift) => gift.id === id);
  }

  async searchGifts(query) {
    const allGifts = await this.getAllGifts();
    const lowerQuery = query.toLowerCase();

    return allGifts.filter(
      (gift) =>
        gift.name.toLowerCase().includes(lowerQuery) ||
        gift.description.toLowerCase().includes(lowerQuery) ||
        gift.category.toLowerCase().includes(lowerQuery),
    );
  }

  async getGiftsBySuperpower(minRating = 0) {
    const allGifts = await this.getAllGifts();

    return allGifts.filter((gift) =>
      Object.values(gift.superpowers).some(
        (rating) => parseInt(rating.replace('+', '')) >= minRating,
      ),
    );
  }

  async getGiftsBySuperpowerCategory(category, minRating = 0) {
    const allGifts = await this.getAllGifts();

    return allGifts.filter(
      (gift) =>
        gift.hasSuperpower(category) &&
        parseInt(gift.getSuperpowerRating(category).replace('+', '')) >=
          minRating,
    );
  }

  getCategories() {
    return Object.values(GIFT_CATEGORIES);
  }

  getSuperpowerCategories() {
    const allGifts = this.gifts.length > 0 ? this.gifts : [];
    const categories = new Set();

    allGifts.forEach((gift) => {
      Object.keys(gift.superpowers).forEach((category) =>
        categories.add(category),
      );
    });

    return Array.from(categories);
  }

  getStats() {
    const allGifts = this.gifts.length > 0 ? this.gifts : [];

    return {
      total: allGifts.length,
      byCategory: this.getGiftCountByCategory(),
      bySuperpowerCategory: this.getGiftCountBySuperpowerCategory(),
      averageSuperpowerSum: this.getAverageSuperpowerSum(),
    };
  }

  getGiftCountByCategory() {
    const counts = {};
    const allGifts = this.gifts.length > 0 ? this.gifts : [];

    Object.values(GIFT_CATEGORIES).forEach((category) => {
      counts[category] = 0;
    });

    allGifts.forEach((gift) => {
      if (Object.prototype.hasOwnProperty.call(counts, gift.category)) {
        counts[gift.category]++;
      }
    });

    return counts;
  }

  getGiftCountBySuperpowerCategory() {
    const counts = {};
    const allGifts = this.gifts.length > 0 ? this.gifts : [];

    allGifts.forEach((gift) => {
      Object.entries(gift.superpowers).forEach(([category]) => {
        if (!counts[category]) {
          counts[category] = 0;
        }
        counts[category]++;
      });
    });

    return counts;
  }

  getAverageSuperpowerSum() {
    const allGifts = this.gifts.length > 0 ? this.gifts : [];
    const sums = allGifts.map((gift) => gift.getSuperpowerSum());

    return sums.length > 0
      ? sums.reduce((total, current) => total + current, 0) / sums.length
      : 0;
  }

  clearCache() {
    this.gifts = [];
    this.error = null;
  }
}
