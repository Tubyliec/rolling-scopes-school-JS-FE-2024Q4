export abstract class AdditionalUtilities {
  public static getRandomColor(): string {
    const letters: string = '0123456789ABCDEF';
    let randomColor: string = '#';
    for (let index = 0; index < 6; index += 1) {
      randomColor += letters[Math.floor(Math.random() * 16)];
    }
    return randomColor;
  }
}
