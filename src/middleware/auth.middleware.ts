export function authMiddleware (roles: string[]) {
    return (req, res, next) => {
      const isAuthorized = req.session.user && roles.includes(req.session.user.role.role);
      if (isAuthorized) {
        next();
      } else {
        res.sendStatus(401);
        res.send('The incoming token has expired');
      }
    };
  }