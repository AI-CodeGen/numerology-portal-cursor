export class NumerologyService {
  private readonly numberValues: { [key: string]: number } = {
    '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9,
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5,
    'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5,
    'O': 6, 'P': 7, 'Q': 8, 'R': 9,
    'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5,
    'X': 6, 'Y': 7, 'Z': 8
  };

  private reduceToSingleDigit(num: number): number {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  }

  public calculateMobileNumerology(mobileNumber: string) {
    const numbers = mobileNumber.replace(/\D/g, '');
    let sum = 0;
    
    for (const digit of numbers) {
      sum += parseInt(digit);
    }
    
    const destinyNumber = this.reduceToSingleDigit(sum);
    
    return {
      mobileNumber,
      destinyNumber,
      interpretation: this.getMobileInterpretation(destinyNumber)
    };
  }

  public calculateNameNumerology(name: string) {
    const upperName = name.toUpperCase();
    let sum = 0;
    
    for (const char of upperName) {
      if (this.numberValues[char]) {
        sum += this.numberValues[char];
      }
    }
    
    const destinyNumber = this.reduceToSingleDigit(sum);
    
    return {
      name,
      destinyNumber,
      interpretation: this.getNameInterpretation(destinyNumber)
    };
  }

  public calculateVehicleNumerology(vehicleNumber: string) {
    const numbers = vehicleNumber.replace(/\D/g, '');
    let sum = 0;
    
    for (const digit of numbers) {
      sum += parseInt(digit);
    }
    
    const destinyNumber = this.reduceToSingleDigit(sum);
    
    return {
      vehicleNumber,
      destinyNumber,
      interpretation: this.getVehicleInterpretation(destinyNumber)
    };
  }

  private getMobileInterpretation(number: number): string {
    const interpretations: { [key: number]: string } = {
      1: "Leadership and independence. This number brings strong individuality and self-confidence.",
      2: "Cooperation and balance. This number enhances relationships and diplomacy.",
      3: "Creativity and self-expression. This number brings joy and artistic abilities.",
      4: "Stability and practicality. This number brings organization and hard work.",
      5: "Freedom and change. This number brings adventure and versatility.",
      6: "Responsibility and nurturing. This number brings harmony and service to others.",
      7: "Spirituality and analysis. This number brings wisdom and introspection.",
      8: "Power and success. This number brings material abundance and authority.",
      9: "Humanitarianism and completion. This number brings universal love and wisdom."
    };
    return interpretations[number] || "Unknown interpretation";
  }

  private getNameInterpretation(number: number): string {
    const interpretations: { [key: number]: string } = {
      1: "Natural leader with strong willpower and determination.",
      2: "Peacemaker with excellent diplomatic skills.",
      3: "Creative and expressive with artistic talents.",
      4: "Practical and organized with strong work ethic.",
      5: "Adventurous and freedom-loving with versatile nature.",
      6: "Nurturing and responsible with strong sense of duty.",
      7: "Analytical and spiritual with deep wisdom.",
      8: "Ambitious and successful with strong business sense.",
      9: "Humanitarian and compassionate with universal love."
    };
    return interpretations[number] || "Unknown interpretation";
  }

  private getVehicleInterpretation(number: number): string {
    const interpretations: { [key: number]: string } = {
      1: "Vehicle brings independence and leadership qualities.",
      2: "Vehicle promotes harmony and balance in travel.",
      3: "Vehicle enhances creativity and self-expression.",
      4: "Vehicle provides stability and reliability.",
      5: "Vehicle supports freedom and adventure.",
      6: "Vehicle brings comfort and responsibility.",
      7: "Vehicle enhances spiritual connection.",
      8: "Vehicle represents success and power.",
      9: "Vehicle promotes universal connection."
    };
    return interpretations[number] || "Unknown interpretation";
  }
} 