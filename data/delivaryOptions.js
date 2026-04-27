export const delivaryOptions = [
  {
    id: "1",
    delivaryDays: 7,
    delivaryPrice: 0,
  },
  {
    id: "2",
    delivaryDays: 3,
    delivaryPrice: 499,
  },
  {
    id: "3",
    delivaryDays: 1,
    delivaryPrice: 999,
  },
];

export function getDeliveryOption(delivaryOptionId) {
  let delivaryOption;
  delivaryOptions.forEach((delivary) => {
    if (delivary.id === delivaryOptionId) {
      delivaryOption = delivary;
    }
  });
  return delivaryOption;
}
