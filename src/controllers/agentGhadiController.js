import Ghadi from '../models/Ghadi.js';
import Result from '../models/Result.js';
import UserMap from '../models/UserMap.js';

// Get assigned ghadi list for agent
export const getAgentGhadis = async (req, res, next) => {
  try {
    const userId = req.user.User_Id;
    const map = await UserMap.findOne({ User_Id: userId, isActive: true, isDeleted: false });
    if (!map || !map.GID.length) return res.json({ success: true, data: [] });
    const ghadiList = await Ghadi.find({ GID: { $in: map.GID }, isActive: true, isDeleted: false });
    res.json({ success: true, data: ghadiList });
  } catch (err) { next(err); }
};

// Get all previous results for a specific ghadi (must be assigned to agent)
export const getAgentGhadiResults = async (req, res, next) => {
  try {
    const userId = req.user.User_Id;
    const { ghadiId } = req.query; // numeric GID
    // Confirm this ghadi is assigned to the agent
    const map = await UserMap.findOne({ User_Id: userId, GID: ghadiId, isActive: true, isDeleted: false });
    if (!map) return res.status(403).json({ message: 'Not authorized for this ghadi' });
    const results = await Result.find({ GID: ghadiId, isDeleted: false }).sort({ DateTime: -1 });
    res.json({ success: true, data: results });
  } catch (err) { next(err); }
};

// Update result for an assigned ghadi
export const agentUpdateResult = async (req, res, next) => {
  try {
    const userId = req.user.User_Id;
    const { ghadiId, result, dateTime } = req.body;
    // Confirm this ghadi is assigned to the agent
    const map = await UserMap.findOne({ User_Id: userId, GID: ghadiId, isActive: true, isDeleted: false });
    if (!map) return res.status(403).json({ message: 'Not authorized for this ghadi' });

    // Update Ghadi's current result (latest)
    await Ghadi.findOneAndUpdate({ GID: ghadiId }, { Result: result, ModifiedOn: new Date() });

    // Add to Result collection for history
    await Result.create({
      GID: ghadiId,
      Result: result,
      DateTime: dateTime || new Date(),
      CreatedById: userId
    });

    res.json({ success: true, message: 'Result updated' });
  } catch (err) { next(err); }
};
