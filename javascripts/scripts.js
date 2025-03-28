document.addEventListener("DOMContentLoaded", function () {
  const DateTime = luxon.DateTime;

  // Инициализация datepicker
  const picker = datepicker("#birthdate", {
    formatter: (input, date, instance) => {
      const formattedDate = date.toISOString().split("T")[0];
      input.value = formattedDate;
    },
    maxDate: new Date(), // Запрет выбора будущей даты
  });

  document.querySelector("#calculate").addEventListener("click", function () {
    const birthdateValue = document.querySelector("#birthdate").value;
    if (!birthdateValue) {
      document.querySelector("#result").textContent =
        "Пожалуйста, выберите дату рождения.";
      return;
    }

    const birthDate = DateTime.fromISO(birthdateValue);
    const now = DateTime.now();
    const diff = now.diff(birthDate, ["years", "months", "days"]).toObject();

    document.querySelector("#result").textContent = `Ваш возраст: ${Math.floor(
      diff.years
    )} лет, ${Math.floor(diff.months)} месяцев, ${Math.floor(diff.days)} дней.`;
  });
});
