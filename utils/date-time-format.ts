import { format } from "date-fns";
import { formatInTimeZone, utcToZonedTime } from "date-fns-tz";
import enAU from 'date-fns/locale/en-AU'


export const formatMatchStartDate = ({ date }: { date: string }) => {
    const parsedDate = new Date(date);
    let month = format(parsedDate, 'MMMM');
    let numericDay = format(parsedDate, 'dd');
    let day = format(parsedDate, 'EEEE');
    let year = format(parsedDate, 'yyyy');
    return {
        month,
        day,
        numericDay,
        year
    }
}

export const formatTime = ({ utcMatchStart, timeZone }: { utcMatchStart: string, timeZone: string }) => {
    const parsedDate = utcToZonedTime(new Date(utcMatchStart), timeZone, { locale: enAU });
    const formattedTime = format(parsedDate, 'p');

    // Get the timezone
    const date = new Date(utcMatchStart);
    const pattern = '(z)';
    const australianTimezone = formatInTimeZone(date, timeZone, pattern, { locale: enAU });
    
    return {
        time: formattedTime,
        timeZone: australianTimezone
    }
}

export const formatSecondsToDisplayTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const seconds_ = seconds % 60;
    return (mins < 10 ? `0${mins.toString()}` : mins.toString()) + ":" + (seconds_ < 10 ? `0${seconds_.toString()}` : seconds_.toString());
};