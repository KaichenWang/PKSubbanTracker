export const PLAYERS = {
  8474056: {
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
      '20162017-P': {
        teamId: 18,
        games: 22,
        goals: 2,
        assists: 10,
        points: 12,
        plusMinus: 5,
      },
    },
  },
  8470642: {
    firstName: 'Shea',
    lastName: 'Weber',
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
        teamId: 8,
        games: 78,
        goals: 17,
        assists: 25,
        points: 42,
        plusMinus: 20,
      },
      '20162017-P': {
        teamId: 8,
        games: 6,
        goals: 1,
        assists: 2,
        points: 3,
        plusMinus: 1,
      },
    },
  },
};

export const TEAMS = {
  1: {
    location: 'New Jersey',
    name: 'Devils',
    stats: {},
  },
  8: {
    location: 'Montreal',
    name: 'Canadiens',
    stats: {
      20162017: {
        win: 47,
        loss: 26,
        overtimeLoss: 9,
        isPlayoff: false,
        round: null,
        points: 103,
      },
      '20162017-P': {
        win: 2,
        loss: 4,
        overtimeLoss: null,
        isPlayoff: true,
        round: 1,
        points: null,
      },
    },
  },
  18: {
    location: 'Nashville',
    name: 'Predators',
    stats: {
      20162017: {
        win: 41,
        loss: 29,
        overtimeLoss: 12,
        isPlayoff: false,
        round: null,
        points: 94,
      },
      '20162017-P': {
        win: 2,
        loss: 4,
        overtimeLoss: null,
        isPlayoff: true,
        round: 4,
        points: null,
      },
    },
  },
};

export const SEASONS = [
  {
    id: '20202021',
    name: 'Regular season 2020-2021',
  },
  {
    id: '20162017-P',
    name: 'Playoffs 2016-2017',
  },
  {
    id: '20162017',
    name: 'Regular season 2016-2017',
  },
  {
    id: 'total',
    name: 'Totals since trade',
  },
];

export const CURRENT_SEASON_ID = '20202021';
