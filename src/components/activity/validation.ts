import type { ActivityInstance } from "@zvms/zvms4-types";
import dayjs from "dayjs";

export function validateActivity(activity: ActivityInstance): boolean {
  if (!activity) return false;
  if (!activity.name) return false;
  if (!activity.date) return false;
  try {
    dayjs(activity.date);
  } catch (e) {
    return false;
  }
  if (!activity.type) return false;
  if (activity.type === 'special' && !activity.special) return false;
  if (activity.type === 'special' && !activity.special.classify) return false;
  if (activity.type === 'specified') {
    if (!activity.registration.place) return false;
    if (!activity.registration.duration) return false;
    if (!activity.registration.deadline) return false;
    try {
      const deadline = dayjs(activity.registration.deadline);
      if (deadline.isBefore(activity.date)) return false;
    } catch (e) {
      return false;
    }
    if (activity.registration.classes.length === 0) return false;
    for (const cls of activity.registration.classes) {
      if (!cls.classid) return false;
      if (cls.classid % 100 > 20) return false;
      const range = [dayjs().year() - 4, dayjs().year() + 1];
      const year = Math.floor(cls.classid / 100);
      if (year < range[0] || year > range[1]) return false;
      if (!cls.max) return false;
      if (cls.max < 0) return false;
      if (cls.max > 100) return false;
    }
  }
  for (const member of activity.members) {
    if (!member._id) return false;
    if (!member.duration) return false;
    if (member.duration < 0) return false;
    if (member.duration > 12) return false;
    if (!member.mode) return false;
  }
  return true
}
