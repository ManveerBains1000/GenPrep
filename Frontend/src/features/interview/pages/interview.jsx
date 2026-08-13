import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import {useInterview} from "../hooks/useInterview.js"
import { useNavigate } from 'react-router'



const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

const mockReport = {
    _id: 'mock-report-001',
    title: 'Senior Frontend Engineer Match Report',
    matchScore: 86,
    technicalQuestions: [
        {
            question: 'Explain how React uses a virtual DOM to improve performance.',
            intention: 'Assess understanding of React rendering and reconciliation.',
            answer: 'React maintains a lightweight virtual representation of the DOM. When state or props change, it compares the previous virtual tree with the next one in a process called reconciliation. It updates only the parts of the real DOM that actually changed, which reduces expensive DOM operations and improves rendering performance for interactive applications.'
        },
        {
            question: 'How would you optimize a React application with a large list?',
            intention: 'Evaluate performance tuning and scalable UI patterns.',
            answer: 'I would memoize expensive computations, avoid unnecessary re-renders with React.memo or useMemo, render long lists with virtualization, and reduce state churn by lifting shared state only when needed. Profiling with React DevTools helps identify bottlenecks before optimizing.'
        },
        {
            question: 'What is the difference between useMemo and useCallback?',
            intention: 'Check knowledge of hook optimization strategies.',
            answer: 'useMemo memoizes a computed value, while useCallback memoizes a function instance. They are useful for preventing expensive recalculations and preventing child components from rerendering unnecessarily when function references are stable.'
        }
    ],
    behavioralQuestions: [
        {
            question: 'Tell me about a time you resolved a conflict in a team project.',
            intention: 'Assess communication, ownership, and collaboration skills.',
            answer: 'During a sprint, two teammates disagreed on the direction of a feature. I facilitated a quick discussion, aligned on project goals, and created a small decision matrix to compare trade-offs. We agreed on a compromise, shipped the feature on time, and documented the lessons learned for future work.'
        },
        {
            question: 'Describe a time you handled ambiguous requirements.',
            intention: 'Evaluate problem solving and decision-making under uncertainty.',
            answer: 'When requirements were incomplete, I clarified assumptions with stakeholders, broke the task into deliverable milestones, and validated early with a prototype. This reduced risk and helped the team iterate based on real feedback instead of guessing.'
        }
    ],
    skillGaps: [
        { skill: 'System Design', severity: 'medium' },
        { skill: 'GraphQL', severity: 'low' },
        { skill: 'Database Optimization', severity: 'high' }
    ],
    preparationPlan: [
        {
            day: 1,
            focus: 'React Fundamentals Review',
            tasks: ['Review hooks, state management, and rendering lifecycle', 'Practice one component refactor exercise', 'Write notes on reconciliation patterns']
        },
        {
            day: 2,
            focus: 'Performance Optimization',
            tasks: ['Study memoization and list virtualization', 'Benchmark a slow component with devtools', 'Refactor code to reduce unnecessary renders']
        },
        {
            day: 3,
            focus: 'System Design Practice',
            tasks: ['Review scalable front-end architecture patterns', 'Draft a design for a feed-based app', 'Prepare tradeoff explanations for API and caching decisions']
        }
    ]
};

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const {interviewReport: report} = useInterview()
    const activeReport = report

    const scoreColor =
        activeReport.matchScore >= 80 ? 'score--high' :
            activeReport.matchScore >= 60 ? 'score--mid' : 'score--low'



    return (
        <div className='interview-page'>
            <div className='interview-layout'>

                {/* ── Left Nav ── */}
                <nav className='interview-nav'>
                    <div className="nav-content">
                        <p className='interview-nav__label'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className='interview-divider' />

                {/* ── Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>{activeReport.technicalQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {(activeReport.technicalQuestions || []).map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>{activeReport.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='q-list'>
                                {(activeReport.behavioralQuestions || []).map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                                <span className='content-header__count'>{activeReport.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='roadmap-list'>
                                {(activeReport.preparationPlan || []).map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>

                    {/* Match Score */}
                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{activeReport.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>Strong match for this role</p>
                    </div>

                    <div className='sidebar-divider' />

                    {/* Skill Gaps */}
                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {(activeReport.skillGaps || []).map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview