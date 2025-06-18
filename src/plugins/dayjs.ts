import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import calendar from 'dayjs/plugin/calendar'
import isToday from 'dayjs/plugin/isToday'
import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(duration)
dayjs.extend(calendar)
dayjs.extend(isToday)
dayjs.extend(isBetween)

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault('Asia/Shanghai')

export default dayjs
