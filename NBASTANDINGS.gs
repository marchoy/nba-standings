/**
 * Returns current NBA League standings.
 * 
 * @return a two-dimensional array containing the data, with the first row containing the headers
 * @customfunction
 */
 
function NBASTANDINGS() {
  var url = 'http://data.nba.net/10s/prod/v1/today.json';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);
  var year = data.teamSitesOnly['seasonYear'];
  
  var url = 'http://data.nba.net/v2015/json/mobile_teams/nba/' + year + '/00_standings_02.json';
  var response = UrlFetchApp.fetch(url);
  var json = response.getContentText();
  var data = JSON.parse(json);

  var standings = [];
  var headers = [
    'Conference',
    'Division',
    'Team ID',
    'Conference Seed',
    'Clinched Playoffs',
    'Clinched Division',
    'Clinched Conference',
    'Eliminated from Playoffs',
    'Team City',
    'Team Name',
    'Team Code',
    'Games Played',
    'Wins',
    'Losses',
    'Win%',
    'Games Behind',
    'Streak',
    'Last 10',
    'Home Record',
    'Away Record',
    'Division Record',
    'Conference Record'
  ];
  standings.push(headers);
  
  for (var co = 0; co < 2; co++) {
    var conference = data.sta['co'][co]['val'];
    for (var di = 0; di < 3; di++) {
      var division = data.sta['co'][co]['di'][di]['val'];
      for (var t = 0; t < 5; t++) {
        var teamData = data.sta['co'][co]['di'][di]['t'][t];
        standings.push([
          conference,
          division,
          teamData['tid'],
          teamData['see'],
          teamData['cli'] === 1,
          teamData['clid'] === 1,
          teamData['clic'] === 1,
          teamData['elim'] === 1,
          teamData['tc'],
          teamData['tn'],
          teamData['ta'],
          teamData['w'] + teamData['l'],
          teamData['w'],
          teamData['l'],
          teamData['w']/(teamData['w'] + teamData['l']),
          teamData['gb'],
          teamData['str'],
          teamData['l10'],
          teamData['hr'],
          teamData['ar'],
          teamData['dr'],
          teamData['cr']
        ]);
      }
    }
  }
  return standings;
}
