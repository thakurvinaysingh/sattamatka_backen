// Accepts one or many roles
const requireRole = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized' });
      }
      if (Array.isArray(requiredRole)) {
        if (!requiredRole.includes(req.user.UserType)) {
          return res.status(403).json({ message: 'Access denied' });
        }
      } else {
        if (req.user.UserType !== requiredRole) {
          return res.status(403).json({ message: 'Access denied' });
        }
      }
      next();
    };
  };
  
  export default requireRole;
  