export const matchCheckMiddleware = exhaustiveMode => (request, response, next) => {
    const match = request.body;
    const errors = [];
    if (exhaustiveMode) {
      if (!match.team1) {
        errors.push('Team 1 is missing');
      }
      if (!match.team2) {
        errors.push('Team 2 is missing');
      }
      if (!match.score) {
        errors.push('Score is missing');
      }
    }
    if (match.score || exhaustiveMode) {
      if (!Number.isInteger(parseInt(match.score))) {
        errors.push('Score must be an integer');
      }
      if ((match.score < 0)) {
        errors.push('Match must be higher than 0');
      }
    }
    if (match.team1 || exhaustiveMode) {
      if (!(typeof match.team1 === 'string')) {
        errors.push('Team 1 name must be a string');
      }
      if (!(typeof match.team2 === 'string')) {
        errors.push('Team 2 name must be a string');
      }
      if (!(match.team1?.length >= 3)) {
        errors.push('Team1 name length must be higher or equal to 3');
      }
      if (!(match.team2?.length >= 3)) {
        errors.push('Team2 name length must be higher or equal to 3');
      }
    }
    if (errors.length) {
      next({ code: 400, details: `Body has the following errors: ${errors.join(', ')}` });
    } else {
      next();
    }
  };
  