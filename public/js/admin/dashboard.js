document.addEventListener('DOMContentLoaded', () => {
    const courseList = document.getElementById('course-list');
    
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
                <button onclick="editCourse('${course._id}')">Edit</button>
                <button onclick="deleteCourse('${course._id}')">Delete</button>
            `;
            courseList.appendChild(li);
        });
    };

    const editCourse = async (courseId) => {
        const response = await fetch(`/api/courses/${courseId}`);
        const course = await response.json();
        
        // Populate the form with course details for editing
        document.getElementById('course-name').value = course.courseName;
        document.getElementById('course-code').value = course.courseCode;
        document.getElementById('department').value = course.department;
        document.getElementById('schedule-days').value = course.schedule.days.join(', ');
        document.getElementById('schedule-time').value = course.schedule.time;
        document.getElementById('seats-available').value = course.seatsAvailable;
        
        document.getElementById('course-form').onsubmit = async (e) => {
            e.preventDefault();
            
            const updatedCourse = {
                courseName: document.getElementById('course-name').value,
                courseCode: document.getElementById('course-code').value,
                department: document.getElementById('department').value,
                schedule: {
                    days: document.getElementById('schedule-days').value.split(',').map(day => day.trim()),
                    time: document.getElementById('schedule-time').value
                },
                seatsAvailable: document.getElementById('seats-available').value
            };
            
            const updateResponse = await fetch(`/api/courses/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCourse)
            });
            
            if (updateResponse.ok) {
                loadCourses();
            }
        };
    };

    const deleteCourse = async (courseId) => {
        const response = await fetch(`/api/courses/${courseId}`, { method: 'DELETE' });
        if (response.ok) {
            loadCourses();
        }
    };

    loadCourses();
});
