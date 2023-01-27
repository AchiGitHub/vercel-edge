import { setBearerToken } from '../common/setHeaders';
import { AllMatchData, Round } from '../../types/match-types';
import { isAfter, isSameDay } from 'date-fns';

const fetchMatchFixtures = async () => {
  const response = await fetch(
    'https://api.afl-sandbox.championdata.io/v1/seasons/2021/fixture',
    {
      method: 'GET',
      headers: setBearerToken({
        accept: 'application/json',
      }),
    }
  );
  let data: AllMatchData = await response.json();

  let rounds: Round[] = [];

  // TODO: Remove once the data returned from the API is valid
  let customStartDate = localStorage.getItem('startDate') || '2021-04-09T07:56:52.439Z';

  // Map all phases
  data.phases.forEach(phase => {
    const allRounds = phase.rounds;
    // Iterate through all the rounds
    allRounds.forEach(round => {
      const roundMatches = round.matches;
      let availableMatches = roundMatches.filter(match => {
        if (match.date != null) {
          // Check the match date is on current date or in future
          const startDate = new Date(match.date.startDate);
          const currentDate = new Date(customStartDate);
          if (isSameDay(currentDate, startDate) || isAfter(startDate, currentDate)) {
            return true
          }
        }
      })
      round.matches = availableMatches;

      if (round.matches.length !== 0) {
        rounds = [...rounds, round];
      }
      
    })
  });
  
  return rounds;
};

export { fetchMatchFixtures };