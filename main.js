import refs from './ref.js';

class CountdownTimer {
  constructor({ onTick }) {
    this.selector = '#timer-1';
    this.targetDate = new Date(2021, 11, 31, 23, 59);
    this.onTick = onTick;
  }

  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  onTick: updateTimerView,
});

timer.start();

function updateTimerView({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.texContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}

//=============================================================
// 1 variant

// const timer = {
//   start() {
//     const targetDate = new Date(2021, 11, 31, 23, 59);

//     setInterval(() => {
//       const currentTime = Date.now();
//       const deltaTime = targetDate - currentTime;
//       const time = getTimeComponents(deltaTime);

//       updateTimerView(time);
//     }, 1000);
//   },
// };

// timer.start();

// // Принимает время в миллисекундах
// // Высчитывает сколько в них вмещается часов/минут/секунд
// // Возвращае объект со свойствами hours, mins, secs
// function getTimeComponents(time) {
//   const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
//   const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
//   const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
//   const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

//   return { days, hours, mins, secs };
// }

// // Принимает число, приводит к строке и добавляет в начало 0,
// // если число меньше 2 - х знаков 1 -> 01, 7 -> 07, 12 -> 12
// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// //Принимает время в миллисекундах
// // Высчитывает сколько в них вмещается часов/минут/секунд
// // Рисует интерфейс
// function updateTimerView({ days, hours, mins, secs }) {
//   refs.days.textContent = `${days}`;
//   refs.hours.texContent = `${hours}`;
//   refs.mins.textContent = `${mins}`;
//   refs.secs.textContent = `${secs}`;
// }
//=============================================================
