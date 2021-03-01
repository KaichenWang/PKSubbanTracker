export const LATEST_SEASON_ID = '20202021';

export const PLAYERS = [
  {
    id: 8474056,
    firstName: 'P.K.',
    lastName: 'Subban',
    stats: {
      total: {
        teamId: 1,
        games: 0,
        goals: 0,
        assists: 0,
        points: 0,
        plusMinus: 0,
      },
      20162017: {
        teamId: 18,
        games: 66,
        goals: 10,
        assists: 30,
        points: 40,
        plusMinus: -8,
      },
      '20162017p': {
        teamId: 18,
        games: 22,
        goals: 2,
        assists: 10,
        points: 12,
        plusMinus: 5,
      },
    },
  },
  {
    id: 8470642,
    firstName: 'Shea',
    lastName: 'Weber',
    stats: {
      total: {
        teamId: 8,
        games: 0,
        goals: 0,
        assists: 0,
        points: 0,
        plusMinus: 0,
      },
      20162017: {
        teamId: 8,
        games: 78,
        goals: 17,
        assists: 25,
        points: 42,
        plusMinus: 20,
      },
      '20162017p': {
        teamId: 8,
        games: 6,
        goals: 1,
        assists: 2,
        points: 3,
        plusMinus: 1,
      },
    },
  },
];

export const TEAMS = [
  {
    id: 1,
    location: 'New Jersey',
    name: 'Devils',
    stats: {},
  },
  {
    id: 8,
    location: 'Montreal',
    name: 'Canadiens',
    stats: {
      20162017: {
        win: 47,
        loss: 26,
        overtimeLoss: 9,
        type: 'league',
        round: null,
        points: 103,
      },
      '20162017p': {
        win: 2,
        loss: 4,
        overtimeLoss: null,
        type: 'playoff',
        round: 1,
        points: null,
      },
    },
  },
  {
    id: 18,
    location: 'Nashville',
    name: 'Predators',
    stats: {
      20162017: {
        win: 41,
        loss: 29,
        overtimeLoss: 12,
        type: 'league',
        round: null,
        points: 94,
      },
      '20162017p': {
        win: 2,
        loss: 4,
        overtimeLoss: null,
        type: 'playoff',
        round: 4,
        points: null,
      },
    },
  },
];

export const SEASONS = [
  {
    id: '20202021',
    name: '2020-2021',
  },
  {
    id: '20162017p',
    name: 'Playoffs 2016-2017',
  },
  {
    id: '20162017',
    name: '2016-2017',
  },
  {
    id: 'total',
    name: 'Totals since trade',
  },
];
