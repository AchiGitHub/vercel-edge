import '@testing-library/jest-dom';
import { formatMatchStartDate, formatSecondsToDisplayTime, formatTime } from 'utils/date-time-format';

describe('Date time formatter functions', () => {
    it('should format time to A.M/P.M from formatTime', () => {
        expect(formatTime({ utcMatchStart: '2021-04-15T09:20:00.000Z', timeZone: 'Australia/Melbourne' })).toEqual({ "time": "7:20 PM", "timeZone": '(AEST)' })
    })
    it('should format date from month, day and numeric day from formatMatchStartDate', () => {
        expect(formatMatchStartDate({ date: '2021-03-18T19:25:00' })).toEqual({
            month: 'March',
            day: 'Thursday',
            numericDay: "18",
            year: '2021'
        })
    })
    it('should format seconds to minutes:seconds from formatSecondsToDisplayTime', () => {
        expect(formatSecondsToDisplayTime(300)).toEqual("05:00")
    })
})