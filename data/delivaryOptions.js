import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

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

export function getDeliveryDay(delivaryOptionId) {
  let delivaryOption = getDeliveryOption(delivaryOptionId);

  const todaysDate = dayjs();
  const delivaryDate = todaysDate.add(delivaryOption.delivaryDays, "days");
  const deliveryDay = delivaryDate.format("dddd");
  if (deliveryDay === "Saturday") {
    delivaryOption.delivaryDays = delivaryOption.delivaryDays + 2;
  } else if (deliveryDay === "Sunday") {
    delivaryOption.delivaryDays = delivaryOption.delivaryDays + 1;
  }
  return delivaryOption.delivaryDays;
}
