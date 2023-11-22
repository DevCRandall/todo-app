import React from 'react'
import './Home.css'

export default function Home() {
    return (
        <section>
            <div className='bg-image'>
                <div className="position-absolute top-50 start-50 translate-middle p-5 home">
                        <h3>ToDo App</h3>
                        <p>
                            DoItNow+ is feature-rich and user-friendly to-do list app designed to help you stay organized and boost your
                            productivity. With a sleek and intuitive interface, DoItNow+ makes it easy to manage your tasks, prioritize your
                            activities, and keep track of your progress. Key features include:
                        </p>
                        <br />
                        <ul className='text-start'>
                            <li>
                                Task Creation: Easily create, edit, and categorize tasks with detailed descriptions, due dates, and
                                priorities.
                            </li>

                            <li>Lists and Categories: Organize your tasks into lists or categories for efficient task management.</li>

                            <li>
                                Reminders and Notifications: Set reminders and receive notifications to ensure you never miss an important
                                task or deadline.
                            </li>

                            <li>Priority Levels: Assign priority levels to your tasks, allowing you to focus on what matters most.</li>

                            <li>Subtasks: Break down complex tasks into smaller, manageable subtasks to make progress tracking easier.</li>

                            <li>
                                Collaboration: Share lists and tasks with friends, family, or colleagues, making it a great choice for both
                                personal and team use.
                            </li>

                            <li>
                                Recurring Tasks: Create recurring tasks for daily, weekly, or monthly activities to automate your routine.
                            </li>

                            <li>Notes and Attachments: Add notes and attachments to tasks for extra context and information.</li>

                            <li>
                                Sync Across Devices: TaskMaster syncs seamlessly across all your devices, ensuring your to-do list is
                                accessible wherever you are.
                            </li>

                            <li>
                                Progress Tracking: Monitor your task completion and overall productivity with visual progress indicators.
                            </li>
                        </ul>
                        <br />
                        <p className='text-center'>
                            DoItNow+ is the perfect solution for busy individuals, students, professionals, and teams looking to streamline
                            their task management, prioritize effectively, and get more done. Take control of your to-do list!
                            <br />
                            With DoItNow+, you'll have everything you need to stay organized and accomplish your goals efficiently.
                            <br />
                        </p>
            </div>
            </div>
        </section>
    )
}
