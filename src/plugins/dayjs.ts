import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import calendar from 'dayjs/plugin/calendar'
import isToday from 'dayjs/plugin/isToday'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(duration)
dayjs.extend(calendar)
dayjs.extend(isToday)
dayjs.extend(isBetween)

export default dayjs
