export function getCurrentDate() {
  return new Date();
}

import { COUNTDOWN_CONFIG } from '../constants/countdown-constants.js';

export function createTargetDate(
  month = COUNTDOWN_CONFIG.TARGET_MONTH,
  day = COUNTDOWN_CONFIG.TARGET_DAY,
  hour = COUNTDOWN_CONFIG.TARGET_HOUR,
  minute = COUNTDOWN_CONFIG.TARGET_MINUTE,
  second = COUNTDOWN_CONFIG.TARGET_SECOND,
) {
  const targetDate = new Date();
  targetDate.setMonth(month);
  targetDate.setDate(day);
  targetDate.setHours(hour);
  targetDate.setMinutes(minute);
  targetDate.setSeconds(second);

  const currentDate = new Date();
  if (targetDate < currentDate) {
    targetDate.setFullYear(currentDate.getFullYear() + 1);
  }

  return targetDate;
}

export function getTimeRemaining(targetDate) {
  const currentDate = getCurrentDate();
  const total = targetDate - currentDate;

  if (total <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: 0,
    };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((total % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    total,
  };
}

export function padNumber(num, size = 2) {
  return num.toString().padStart(size, '0');
}

export function formatTimeUnit(value, unit = '') {
  return `${padNumber(value)}${unit}`;
}

export function isDateInFuture(date) {
  return date > getCurrentDate();
}

export function isDateInPast(date) {
  return date < getCurrentDate();
}

export function getDaysBetween(startDate, endDate) {
  const timeDiff = endDate - startDate;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addHours(date, hours) {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
}

export function addMinutes(date, minutes) {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
}