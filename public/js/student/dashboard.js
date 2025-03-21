document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    const scheduleDiv = document.getElementById('schedule');

    const loadCourses = async () => {
        const response = await fetch('/api/courses');
        const courses = await response.json();
        
        courseList.innerHTML = '';
        
        courses.forEach(course => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${course.courseName}</strong> (${course.courseCode})<br>
                Department: ${course.department}<br>
                Time: ${course.schedule.days.join(", ")} at ${course.schedule.time}<br>
                Seats Available: ${course.seatsAvailable}<br>
                <button onclick="addCourseToSchedule('${course._id}')">Add to Schedule</button>
            `;
            courseList.appendChild(li);
        });
    };

    const addCourseToSchedule = async (courseId) => {
        const response = await fetch(`/api/courses/${courseId}`);
        const course = await response.json();
        
        const courseElement = document.createElement('div');
        courseElement.innerHTML = `
            <strong>${course.courseName}</strong><br>
            Department: ${course.department}<br>
            Time: ${course.schedule.days.join(", ")} at ${course.schedule.time}<br>
        `;
        scheduleDiv.appendChild(courseElement);
    };

    loadCourses();
});
