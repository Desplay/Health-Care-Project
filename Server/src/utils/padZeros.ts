export default function (inputNumber: number): string {
  switch (inputNumber.toString().length) {
    case 1:
      return `000${inputNumber}`;
    case 2:
      return `00${inputNumber}`;
    case 3:
      return `0${inputNumber}`;
    default:
      return `${inputNumber}`;
  }
}
