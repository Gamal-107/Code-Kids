export const validateRunTask = (req, res, next) => {
  const { lessonId, code } = req.body;

  if (!lessonId || code === undefined) {
    return res.status(400).json({ message: "Missing required data" });
  }

  next();
};

export const validateLesson = (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }
  next();
};
