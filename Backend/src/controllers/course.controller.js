import Course from "../models/course.model.js";
console.log("CONTROLLER FILE RUNNING");

export const getAllCourses = async (req, res) => {
    try {
        const Courses = await Course.find().populate("lessons");
        res.json(Courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
export const getCourseById = async (req, res) => {
    try {
        const Course = await Course.findById(req.params.id).populate("lessons");    
        res.json(Course);
    } catch (error) {
        res.status(404).json({ message: "Course not found" });
    }
};
export const createCourse = async (req, res) => {
    try {
        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};  
export const deleteCourse = async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);  
        res.json({ message: "Course deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};
